export default class Locking {
  private isLocked: boolean = false;

  async acquire(): Promise<void> {
    while (this.isLocked) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms before retrying
    }
    this.isLocked = true;
  }

  release(): void {
    this.isLocked = false;
  }
}
