import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ViewTask from '../Components/ViewTask';
import Colors from '../../assets/color';
import ViewExpenses from '../Components/ViewExpenses';
import ViewIncomes from '../Components/View Incomes';

const Tab = createMaterialTopTabNavigator();


interface ViewTaskWrapperProps {
    tasks: any; 
    selected: any; 
    year:any,
    month:any,
    date:any

  }
  function MyTabs({ tasks, selected,year,month,date}: ViewTaskWrapperProps) {
    return (
      <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16,color:Colors.main,fontWeight:'bold'},
      }}
      >
        <Tab.Screen
          name="Tasks"
          initialParams={{ tasks: tasks, selected: selected }}
        >
          {(props) => (
            <ViewTask {...props} tasks={tasks} selected={selected as string} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Expenses" initialParams={{ date:date, month:month,year:year }}>
        {(props) => (
            <ViewExpenses {...props} date={date} month={month}  year={year} />
          )}
        </Tab.Screen>
      <Tab.Screen name="Incomes" initialParams={{ date:date, month:month,year:year }}>
      {(props) => (
          <ViewIncomes {...props} date={date} month={month}  year={year} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
    );
  }

export default MyTabs;
