
import Style from './TTSection.module.css';
import { useSelector } from 'react-redux';
import TTLists from './TTLists';
import TTTasks from './TTTasks';
import TTModalList from './TTModalList';

function TTSection() {

  
  const modalListShow = useSelector(state => state.modalList.isShowForm );

  

  return (
    
    <>
      <section className={Style.tt_section}>
        { modalListShow ? <TTModalList ></TTModalList> :  
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