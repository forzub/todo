
import Style from './TTSection.module.css';
import { useSelector, useDispatch } from 'react-redux';
import TTLists from './TTLists';
import TTTasks from './TTTasks';
import TTModalList from './TTModalList';
import { useEffect } from 'react';
import { loadListFromBase } from '../../store/todo';

function TTSection() {

  const dispatch = useDispatch();
  const modalListShow = useSelector(state => state.modalList.isShowForm);

  useEffect(
    () => { dispatch(loadListFromBase()); }, []
  );

  return (

    <>
      <section className={Style.tt_section}>
        {modalListShow ? <TTModalList ></TTModalList> :
          (
            <div className={Style.tt_wrp}>
              <div className={Style.tt_content}>
                <TTLists />
                <TTTasks />
              </div>
            </div>
          )
        }
      </section>

    </>
  );
}

export default TTSection;