'use client';

interface PresetLoaderButtonProps {
  presetId: string;
  label?: string;
}

export function PresetLoaderButton({
  presetId,
  label = 'Load formula',
}: PresetLoaderButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent('sourdough:load-preset', { detail: presetId })
    );
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-xs font-semibold text-[#C2410C] underline-offset-4 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
    >
      {label}
    </button>
  );
}
