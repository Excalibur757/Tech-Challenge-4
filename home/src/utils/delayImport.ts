export async function delayImport<T>(
  importFn: () => Promise<T>,
  delay = 1000
): Promise<T> {
  await new Promise((resolve) =>
    setTimeout(resolve, delay)
  );

  return importFn();
}