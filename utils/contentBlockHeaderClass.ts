export function contentBlockHeaderClass(opmaak: string) {
  const opmaakOptions: Record<string, string> = {
    h1: 'heading-1',
    h2: 'heading-2',
    h3: 'heading-3',
    h4: 'heading-4',
  };

  return opmaakOptions[opmaak] || 'heading-2';
}
