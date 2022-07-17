import { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-lerna-scopes',
  ],
}

export default config
