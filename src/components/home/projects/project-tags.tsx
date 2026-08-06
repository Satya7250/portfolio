interface ProjectTagsProps {
  tags: string[];
}

export function ProjectTags({ tags }: ProjectTagsProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="border-border text-muted-foreground rounded-full border px-3 py-1 text-xs font-medium"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
