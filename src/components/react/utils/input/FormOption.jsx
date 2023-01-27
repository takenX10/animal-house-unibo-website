import { Col, FormLabel } from 'react-bootstrap'
import Select from '@/components/react/utils/input/Select';
import Checkbox from '@/components/react/utils/input/Checkbox';
import Text from '@/components/react/utils/input/Text';

function FormOption({ register, opt }) {
  let render = null
  let { name, label, labels, fields, description, ...props } = opt
  if (!props.required)
    delete props.required
  switch (props.type) {
    case 'checkbox':
      render = <Checkbox id={name} label={label} labels={labels} name={name} {...props} register={register} ></Checkbox>
      break
    case 'radio':
      render = <Checkbox id={name} label={label} labels={labels} name={name} {...props} register={register} ></Checkbox>
      break
    case 'select':
      render = <Select id={name} label={label} fields={fields} name={name} {...props} register={register}></Select>
      break
    case 'text':
      render = <Text id={name} label={label} description={description} name={name} {...props} register={register}></Text>
  }
  return (
    <Col md={3} className="col mx-auto flex-fill" >
      {render}
      <hr style={{ marginTop: '0vh' }} />
    </Col>
  )
}

export default FormOption
