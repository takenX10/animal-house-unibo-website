import { Form, FormLabel } from 'react-bootstrap';
function Checkbox({ label, labels, register, name, ...props }) {

  return (
    <div className='content'><label htmlFor={name}><b>{label}</b></label>
      <div id={name}>
        {labels.map((l, index) => {
          let forr = name + "-" + index;
          return (
            <>
              <Form.Check
                key={index}
                {...props}
                {...register(name)}
                id={forr}
                label={l}
              ></Form.Check>
            </>)
        })}</div></div>
  );
}
export default Checkbox;
