import { Form } from "react-bootstrap";
import { THEMES } from "../../../utils/appConstants";

type ThemePickerProps = {
  handleChange: any;
};

export default function ThemePicker(props: ThemePickerProps) {
  const { handleChange } = props;
  return (
    <Form>
      <Form.Group controlId='theme' className='pb-2'>
        <Form.Control
          as='select'
          onChange={handleChange}
          defaultValue={"DEFAULT"}>
          <option value='DEFAULT' disabled>
            Select a theme
          </option>
          {THEMES.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
}
