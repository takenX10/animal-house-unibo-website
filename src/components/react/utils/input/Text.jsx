import { Form } from 'react-bootstrap';
function Text({ register, label, description, name, ...props }) {
  let id = `${name}-${props.type}-control`
  let idDesc = `${name}-${props.type}-control-desc`
  return (
    <div className='content'>
      <Form.Label htmlFor={id}><b>{label}</b></Form.Label>
      <Form.Control
        aria-describedby={idDesc}
        {...props}
        {...register(name)}
        id={id}
      />
      <Form.Text id={idDesc} name={name}>
        {description}
      </Form.Text>
    </div>
  )
}
export default Text;
