import React, { ChangeEvent, FormEvent, useState } from 'react';
import { BORDER_RADIOUS, palette, text } from '../libs/styles';
import { HINT_TOPIC_NAME, SAVE_BUTTON_NAME } from '../libs/utils';
import { Topic } from '../models/Topic';
import InputText from './InputText';

const styles = {
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  submitButton: {
    margin: '10px',
    padding: '10px',
    border: 'none',
    borderRadius: BORDER_RADIOUS,
    backgroundColor: palette.white,
    fontSize: text.subtitle.fontSize,
  }
}

interface Props {
  topic?: Topic,
  onSubmit?: (topic: any) => void;
}

function TopicForm(props: Props) {

  const [data, setdata] = useState<any>({});

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setdata({ ...data, [event.target.name]: event.target.value });
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(props.topic) {
      props.topic.name = data.name;
      props.onSubmit?.(props.topic);
    } else {
      const topic = {
        name: data.name
      }
      props.onSubmit?.(topic);
    }
}


  return (<>
    <div>
      <form style={styles.form} onSubmit={onSubmit}>
        <InputText
          hint={HINT_TOPIC_NAME}
          onChange={onChange}
          name="name" value={(props.topic) ? props.topic.name : ""}
          required={true} />

        <button type='submit' className='icon' style={styles.submitButton}>{SAVE_BUTTON_NAME}</button>
      </form>
    </div>
  </>);
}

export default TopicForm;
