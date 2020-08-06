import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api';

import './styles.css';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  function setScheduleItemValue(index: number, field: string, value: string) {
    const updateScheduleItems = scheduleItems.map((scheduleItem, scheduleItemIndex) => {
        if (scheduleItemIndex === index) {
          return { ...scheduleItem, [field]: value }
        }

        return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Registration completed successfully!');

      history.push('/');
    }).catch(() => {
      alert('Registration error!');
    })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
       title="Teaching is amazing!"
       description="The first step is filling up this form"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Your personal data</legend>

            <Input 
              name="name" 
              label="Full name" 
              value={name} 
              onChange={(e) => { setName(e.target.value)}}
            />

            <Input 
              name="avatar" 
              label="Avatar"
              value={avatar} 
              onChange={(e) => { setAvatar(e.target.value)}}            
            />

            <Input 
              name="whatsapp" 
              label="Whatsapp"
              value={whatsapp} 
              onChange={(e) => { setWhatsapp(e.target.value)}}            
            />

            <Textarea 
              name="bio" 
              label="Bio"
              value={bio} 
              onChange={(e) => { setBio(e.target.value)}}            
            />
          </fieldset>

          <fieldset>
            <legend>About the class</legend>

            <Select 
              name="subject" 
              label="Subject"
              value={subject}
              onChange={(e) => { setSubject(e.target.value)}}
              options={[
                { value: 'Arts', label: 'Arts'},
                { value: 'Biology', label: 'Biology'},
                { value: 'Chemistry', label: 'Chemistry'},
                { value: 'English', label: 'English'},
                { value: 'Geography', label: 'Geography'},
                { value: 'History', label: 'History'},
                { value: 'Math', label: 'Math'},
                { value: 'Physics', label: 'Physics'},
              ]}
            />
            <Input 
              name="cost" 
              label="Hourly Cost"
              value={cost} 
              onChange={(e) => { setCost(e.target.value)}}
            />
          </fieldset>
          
          <fieldset>
            <legend>
              Available times
              <button type="button" onClick={addNewScheduleItem}>
                + New time
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select 
                    name="week_day" 
                    label="Week day"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                    options={[
                      { value: '0', label: 'Sunday'},
                      { value: '1', label: 'Monday'},
                      { value: '2', label: 'Tuesday'},
                      { value: '3', label: 'Wednesday'},
                      { value: '4', label: 'Thursday'},
                      { value: '5', label: 'Friday'},
                      { value: '6', label: 'Saturday'},
                    ]}
                  />
                  <Input 
                    name="from" 
                    label="From" 
                    type="time"
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                  />
                  <Input 
                    name="to" 
                    label="To" 
                    type="time"
                    value={scheduleItem.to}
                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Important Warning"/>
              Warning! <br />
              Fill all of the fields
            </p>
            <button type="submit">
              Save
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;