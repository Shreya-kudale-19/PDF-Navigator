import CitationLink from '../CitationLink';

export default function CitationLinkExample() {
  const handleClick = (num: number) => {
    console.log(`Citation ${num} clicked`);
  };

  return (
    <div className="p-8 space-y-6 bg-background">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Citation Links</h3>
        <p className="text-muted-foreground">
          This is sample text with citations{' '}
          <CitationLink number={1} onClick={handleClick} /> and{' '}
          <CitationLink number={2} onClick={handleClick} isActive /> and{' '}
          <CitationLink number={3} onClick={handleClick} />.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-sm text-muted-foreground">States:</h4>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">Default:</span>
            <CitationLink number={1} onClick={handleClick} />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active:</span>
            <CitationLink number={2} onClick={handleClick} isActive />
          </div>
        </div>
      </div>
    </div>
  );
}
