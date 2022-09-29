import { Form } from 'react-bootstrap';
function Select({ register, fields, label, name, ...props }) {

  return (
    <div className='content'><p><b>{label}</b></p>
      <Form.Select {...props} {...register(name)} aria-label={label}>
        {
          fields.map((f, index) => {
            return <option key={index} value={f}>{f}</option>
          })
        }
      </Form.Select></div>
  );
}
export default Select;
