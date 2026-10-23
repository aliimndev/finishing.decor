type SectionHeadProps = {
  title: string;
  body?: string;
  className?: string;
};

export default function SectionHead({
  title,
  body,
  className = "",
}: SectionHeadProps) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      {body && <p className="lead mt-5 text-ink-2">{body}</p>}
    </div>
  );
}
