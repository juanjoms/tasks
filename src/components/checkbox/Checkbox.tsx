import './Checkbox.css';

interface Props {
  id: string;
  checked: boolean;
  onChange: (completed: boolean) => void
}
export const Checkbox = ({ id, checked, onChange }: Props) => (
  <>
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <label htmlFor={id}></label>
  </>
);