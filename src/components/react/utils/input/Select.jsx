import { Form } from 'react-bootstrap';
function Select({ register, fields, label, name, ...props }) {

  return (
    <div className='content'><label htmlFor={name}><b>{label}</b></label>
      <Form.Select {...props} {...register(name)} aria-label={label}>
        {
          fields.map((f, index) => {
            return <option key={index} value={f} label={f}></option>
          })
        }
      </Form.Select></div>
  );
}
export default Select;
