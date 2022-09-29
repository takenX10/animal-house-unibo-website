import { Row } from 'react-bootstrap'
import FormOption from '@/components/react/utils/input/FormOption'

function CustomForm({ register, opts }) {

  return (<Row className='mx-3 col-container h-100 row-flex pb-3'>
    {
      opts.map((opt, index) =>
        <FormOption key={index} register={register} opt={opt} />
      )
    }
  </Row>)
}

export default CustomForm;
