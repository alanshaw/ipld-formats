const Npm = require('npm')
const Os = require('os')
const Path = require('path')
const Fs = require('fs').promises
const ora = require('ora')
const { promisify } = require('util')
const Semver = require('semver')
const shortid = require('shortid')
const rimraf = promisify(require('rimraf'))

async function main (options) {
  options = options || {}

  const spinner = ora()

  spinner.start('Reading IPLD formats configuration file')
  const formatsDataPath = options.formatsDataPath || Path.join(__dirname, 'formats.json')
  const FormatsData = JSON.parse(await Fs.readFile(formatsDataPath))
  spinner.succeed(`Found ${FormatsData.length} IPLD formats in configuration file`)

  const outPath = options.outPath || Path.join(process.cwd(), 'dist')
  spinner.start('Creating output directory ' + outPath)
  await Fs.mkdir(outPath, { recursive: true })
  spinner.succeed('Created output directory ' + outPath)

  spinner.start('Reading installed IPLD formats')
  const modules = await getInstalled(outPath)
  spinner.succeed(`Found ${Object.keys(modules).length} installed IPLD formats`)

  Object.keys(modules).forEach(n => spinner.info(`${n} (${modules[n].length} versions)`))

  spinner.start('Loading npm')
  const npm = await promisify(Npm.load)({ loglevel: 'silent' })
  spinner.succeed('Loaded npm')

  for (var i = 0; i < FormatsData.length; i++) {
    const { name, dist } = FormatsData[i]

    spinner.start(`Determining updated versions for ${name}`)
    const updatedVersions = await getUpdatedVersions(npm, name, modules[name])
    spinner.succeed(`Found ${updatedVersions.length} updated versions for ${name}`)
    if (updatedVersions.length) spinner.info(updatedVersions.join(', '))

    for (var j = 0; j < updatedVersions.length; j++) {
      const updatedVersion = updatedVersions[j]
      const installPath = await mkTmpDir()

      try {
        spinner.info(`Installing ${name}@${updatedVersion} to ${installPath}`)
        await install(npm, name, updatedVersion, installPath)
        spinner.succeed(`Installed ${name}@${updatedVersion} to ${installPath}`)

        const moduleOutPath = Path.join(outPath, `${name}@${updatedVersion}`)
        spinner.start(`Moving browser build to ${moduleOutPath}`)
        await Fs.rename(Path.join(installPath, 'node_modules', name, dist || 'dist'), moduleOutPath)
        spinner.succeed(`Moved browser build to ${moduleOutPath}`)
      } catch (err) {
        spinner.fail(`Failed to install ${name}@${updatedVersion}`)
        console.error(err)
      } finally {
        await rimraf(installPath)
      }
    }
  }

  spinner.succeed(`Done 🚀`)
}

// returns { 'ipld-bitcoin': ['0.0.1', '0.2.0', ...], 'ipld-ethereum': ['1.0.0'] }
async function getInstalled (path) {
  const files = await Fs.readdir(path)
  const stats = await Promise.all(files.map(async f => Fs.stat(Path.join(path, f))))
  const dirs = files.reduce((dirs, f, i) => stats[i].isDirectory() ? dirs.concat(f) : dirs, [])
  return dirs.reduce((mods, dir) => {
    if (dir.includes('@')) {
      const [name, version] = dir.split('@')
      mods[name] = (mods[name] || []).concat(version)
    }
    return mods
  }, {})
}

async function getUpdatedVersions (npm, moduleName, existingVersions) {
  existingVersions = existingVersions || []
  const res = await promisify(npm.commands.view)([moduleName, 'time'], true)
  const currentVersion = Object.keys(res)[0]
  const allVersions = Object.keys(res[currentVersion].time).filter(v => Semver.valid(v))
  if (!existingVersions.length) return allVersions
  const latestExistingVersion = existingVersions.reduce((latest, version) => {
    return Semver.gt(version, latest) ? version : latest
  }, existingVersions[0])
  return allVersions.filter(v => Semver.gt(v, latestExistingVersion))
}

async function mkTmpDir () {
  mkTmpDir.runId = mkTmpDir.runId || shortid()
  const path = Path.join(Os.tmpdir(), mkTmpDir.runId, shortid())
  await Fs.mkdir(path, { recursive: true })
  return path
}

async function install (npm, moduleName, version, path) {
  return promisify(npm.commands.install)(path, [`${moduleName}@${version}`])
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
