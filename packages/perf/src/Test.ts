export default interface Test {
  case(name: string, test: () => void): void
  finish(): void
}
