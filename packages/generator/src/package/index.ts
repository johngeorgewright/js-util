import Generator from 'yeoman-generator'
import { paramCase } from 'change-case'
import { validateGenerationFromRoot } from '../validation'
import * as path from 'path'

export = class PluginGenerator extends Generator {
  private answers: { description?: string; name?: string; public?: boolean }

  constructor(args: string | string[], opts: Record<string, unknown>) {
    super(args, opts)
    this.answers = {}
  }

  initializing() {
    validateGenerationFromRoot(this)
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        message:
          "What is the packages's name? (Minus the @johngeorgewright namespace)",
        name: 'name',
        type: 'input',
        validate: (x) => !!x || 'You must supply a name',
      },
      {
        message: "What's this package about?",
        name: 'description',
        type: 'input',
      },
      {
        message: 'Will this package be published publically?',
        name: 'public',
        type: 'confirm',
      },
    ])
  }

  configuring() {
    this.destinationRoot(`packages/${paramCase(this.answers.name!)}`)
    this.sourceRoot(path.resolve(__dirname, '..', '..', 'templates'))
  }

  writing() {
    const context = {
      description: this.answers.description || '',
      name: paramCase(this.answers.name!),
      public: this.answers.public,
    }

    this.fs.copyTpl(
      this.templatePath('package.json.template'),
      this.destinationPath('package.json'),
      context
    )

    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    )

    this.fs.copy(
      this.templatePath('jest.config.json'),
      this.destinationPath('jest.config.json')
    )

    this.fs.copy(this.templatePath('LICENSE'), this.destinationPath('LICENSE'))

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      context
    )

    this.fs.copyTpl(
      this.templatePath('package-src/index.ts.template'),
      this.destinationPath('src/index.ts'),
      context
    )

    this.fs.copyTpl(
      this.templatePath('package-src/index.test.ts.template'),
      this.destinationPath('src/index.test.ts'),
      context
    )
  }

  install() {
    if (this.answers.public) {
      this.spawnCommandSync('npm', ['publish', '--access', 'public'], {
        cwd: this.destinationPath(),
      })
    }
  }
}
