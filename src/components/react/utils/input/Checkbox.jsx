import { Form } from 'react-bootstrap';
function Checkbox({ labels, register, name, ...props }) {

  return (
    <div className='content'><p><b>{name}</b></p>
      {labels.map((l, index) => {
        return <Form.Check
          key={index}
          {...props}
          {...register(name)}
          label={l} />
      })}</div>
  );
}
export default Checkbox;
