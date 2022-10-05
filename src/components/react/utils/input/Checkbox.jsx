import { Form } from 'react-bootstrap';
function Checkbox({ labels, register, name, ...props }) {

  return (
    <div className='content'><label htmlFor={name}><b>{name}</b></label>
      <div id={name}>
        {labels.map((l, index) => {
          return <Form.Check
            key={index}
            {...props}
            {...register(name)}
            label={l} />
        })}</div></div>
  );
}
export default Checkbox;
