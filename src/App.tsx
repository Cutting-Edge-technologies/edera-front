import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Starter } from './components/starter';
import { ZoomAccount } from './HOC/zoom_account';
import { controls } from './components/dummieObj';
import { StudentsAndFamilies } from './HOC/studentsAndFamilies';
import { TimeTable } from './HOC/timetable_table';
import { PairStudents } from './HOC/pairStudents';
import { CopyLesson } from './HOC/copyLesson';
import { TimeZone } from './HOC/timeZone';
import { PairsAndChats } from './HOC/pairsAndChats';
import { Services } from './HOC/services';
import { Mentors } from './HOC/mentors';
import { Log } from './HOC/log';
import { TeacherService } from './HOC/teacherService';
import { StudentService } from './HOC/studentService';
import { Currency } from './HOC/currency';
import { ServiceGroups } from './HOC/serviceGroup';
import { SingUpHOC } from './HOC/signUp';
import { LogInHOC } from './HOC/logIn';
import { tokenSelector } from './selectors/token';
import { useSelector } from 'react-redux';

// urlpatterns = [
//   path('signup/', views.signup, name='signup'),
//   #path('profile/', views.profile_form, name='profile'),
//   #path('profile/<int:id>/', views.profile_form, name='profile'),
//   #path('profile/desc/', views_teacher.TeacherDescForm.as_view(), name='teacher_desc'),
//   #path('profile/desc/<int:id>/', views_teacher.TeacherDescForm.as_view(), name='teacher_desc'),
//   #path('profile/time/', views_teacher.AddTime.as_view(), name='teacher_time'),
//   #path('profile/time/<int:id>/', views_teacher.AddTime.as_view(), name='teacher_time'),
//   #path('lesson/', views_student.LessonList.as_view(), name='lesson_list'),
//   #path('choose/<int:id>/', views_student.ChooseTime.as_view(), name='choose_time'),
//   #path('choose/', views_student.ChooseTime2.as_view(), name='choose_time'),
//   #path('choose/type/', views_student.ChooseType.as_view(), name='choose_type'),
//   #path('choose/day/', views_student.ChooseDay.as_view(), name='choose_day'),
//   #path('main/', views_student.TeacherList.as_view(), name='teacher_list'),
//   path('bot/msg/', views_bot.send_msg, name='bot_send_msg'),
//   path('bot/timetable/', views_bot.send_timetable, name='bot_send_timetable'),
//   path('integrate/meetings/', views_integrate.write_meetings, name='write_meetings'),
//   path('manage/', views_manage.AddUser.as_view(), name='manage'),
//   path('lk/', views_manage.AddUser.as_view(), name='managelk'),
//   path('users/', views_user.UserInfo.as_view(), name='users'),
//   path('mentors/', views_user.MentorInfo.as_view(), name='mentors'),
//   path('manage/copy/', views_manage.UserCopyLessons.as_view(), name='user_copy_lessons'),
//   path('timetable/', views_user.TimeTable.as_view(), name='timetable'),
//   path('teacher/', views_user.TimeTableTeacher.as_view(), name='teacher'),
//   path('teacher/timetable/', views_user.TimeTableTeacher.as_view(), name='teacher_timetable'),
//   path('services/', views_user.ServiceInfo.as_view(), name='service_info'),
//   path('zoom_account/', views_user.ZoomAccountInfo.as_view(), name='zoom_account'),
//   path('pair_info/', views_user.PairInfo.as_view(), name='pair_info'),
//   path('timezone/', views_user.TimeZoneInfo.as_view(), name='timezone'),
//   path('activate/', views_user.UserActivate.as_view(), name='activate'),
//   path('lessons/', views_integrate.get_lessons, name='lessons'),
//   path('tg/', views_manage.GetUpdates.as_view(), name='tg'),
//   path('clear/', views_manage.ClearUpdates.as_view(), name='clear'),
//   path('log/init/', views_monitor.MonitorLogInit.as_view(), name='log_init'),
//   path('log/', views_monitor.MonitorLog.as_view(), name='log'),
//   path('teacher/service/', views_finance.TeacherServiceView.as_view(), name='teacher_service'),
//   path('student/service/', views_finance.StudentServiceView.as_view(), name='student_service'),
//   path('items/<str:name>/', views_finance.ItemsManage.as_view(), name='items'),
// ]

const router = createBrowserRouter([
  {
    path: 'manage/', element: (<Starter controls={controls}><PairStudents/></Starter>)
  },
  {
    path: 'lk/', element: (<>Lk</>)
  },
  {
    path: 'users/', element: (<Starter controls={controls}><StudentsAndFamilies/></Starter>)
  },
  {
    path: 'mentors/', element: (<Starter controls={controls}><Mentors/></Starter>)
  },
  {
    path: 'manage/copy/', element: (<Starter controls={controls}><CopyLesson/></Starter>)
  },
  {
    path: 'timetable/', element: (<Starter controls={controls}><TimeTable/></Starter>)
  },
  {
    path: 'teacher/', element: (<>Teacker</>)
  },
  {
    path: 'teacher/timetable/', element: (<>Teacher Timetable</>)
  },
  {
    path: 'services/', element: (<Starter controls={controls}><Services/></Starter>)
  },
  {
    path: 'zoom_account/', element: (<Starter controls={controls}><ZoomAccount/></Starter>)
  },
  {
    path: 'pair_info/', element: (<Starter controls={controls}><PairsAndChats/></Starter>)
  },
  {
    path: 'timezone/', element: (<Starter controls={controls}><TimeZone/></Starter>)
  },
  {
    path: 'activate/', element: (<>Activate</>)
  },
  {
    path: 'lessons/', element: (<>Lessons</>)
  },
  {
    path: 'tg/', element: (<>TG</>)
  },
  {
    path: 'clear/', element: (<>Clear</>)
  },
  {
    path: 'log/init/', element: (<>LogInit</>)
  },
  {
    path: 'log/', element: (<Starter controls={controls}><Log/></Starter>)
  },
  {
    path: 'teacher/service/', element: (<Starter controls={controls}><TeacherService/></Starter>)
  },
  {
    path: 'student/service/', element: (<Starter controls={controls}><StudentService/></Starter>)
  },
  {
    path: 'items/currency/', element: (<Starter controls={controls}><Currency/></Starter>)
  },
  {
    path: 'items/servicegroup/', element: (<Starter controls={controls}><ServiceGroups/></Starter>)
  },
  {
    path: 'signup/', element: (<SingUpHOC/>)
  },
  {
    path: 'bot/msg/', element: (<>bot/msg/</>)
  },
  {
    path: 'bot/timetable/', element: (<>bot/timetable/</>)
  },
  {
    path: 'integrate/meetings/', element: (<>integrate/meetings/</>)
  },
  {
    path : '/', element: (<Starter controls={controls}></Starter>), 
  }
]);



const App: React.FC<{}> = () => {
  const token = useSelector(tokenSelector);
  console.log("rerender")
  return (
    <>
      {!!token ? 
        <div className="App">
          <RouterProvider router={router}/>
        </div> : <LogInHOC />
      }
    </>
  );
}

export default App;
