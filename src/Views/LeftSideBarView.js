import React, { useState } from 'react';
import {  useSelector} from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import HabitsList from '../components/LeftSideBar/Habits/HabitsList';
import { Scroll } from '../components/Scroll/Scroll';
import Button from '../components/UIcomponents/Button/Button';
import HabitChoiceModal from '../components/HabitChoiceModal/HabitChoiceModal';
import HabitTemplateModal from '../components/HabitTemplateModal/HabitTemplateModal';
import CustomHabbitModal from '../components/CustomHabbitModal/CustomHabbitModal';
import LeftSideBarStatic from '../components/LeftSideBar/LeftSideBarstatic/LeftSideBarStatic';
import transitionStyles from '../components/ModalContent/ModalTransition.module.css';
import habitsSelector from '../redux/habits/habitsSelector'

const LeftSideBarButton = ({ handelClick }) => {
  const filterItems = useSelector((state)=>habitsSelector.getFilterHabits(state))
  return (
    <Button
      label={'Gewohnheit hinzufügen +'}
      type={'button'}
      green={true}
      handelClick={handelClick}
      animation={filterItems.length? '' : 'animationScale'}
    />
  );
};
export default function LeftSideBarView({ match, onLogOut }) {
  const [customModalData, setCustomModalData] = useState('');
  const [openModal, setOpenModal] = useState('');
  const handelClick = value => {
    setCustomModalData('');
    setOpenModal(value);
  };
  return (
    <>
      <Scroll
        match={match}
        onLogOut={onLogOut}
        handelClick={() => handelClick('add')}
        staticComponentBefore={LeftSideBarStatic}
        scrolledComponent={HabitsList}
        staticComponentAfter={LeftSideBarButton}
        isLeftBar={true}
      />
      <CSSTransition
        in={openModal === 'add'}
        timeout={250}
        classNames={transitionStyles}
        unmountOnExit
      >
        <HabitChoiceModal
          onClose={() => handelClick('')}
          openCustom={() => handelClick('custom')}
          openTemplate={() => handelClick('template')}
        ></HabitChoiceModal>
      </CSSTransition>

      <CSSTransition
        in={openModal === 'template'}
        timeout={250}
        classNames={transitionStyles}
        unmountOnExit
      >
        <HabitTemplateModal
          addData={setCustomModalData}
          goBack={() => handelClick('add')}
          onChooseHabit={() => handelClick('custom')}
          onClose={() => handelClick('')}
        ></HabitTemplateModal>
      </CSSTransition>

      <CSSTransition
        in={openModal === 'custom'}
        timeout={250}
        classNames={transitionStyles}
        unmountOnExit
      >
        <CustomHabbitModal
          habitName={customModalData}
          onClose={() => handelClick('')}
        ></CustomHabbitModal>
      </CSSTransition>
    </>
  );
}
