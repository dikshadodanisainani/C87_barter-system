
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBartars from '../screens/MyBartars';
import Notification from '../screens/Notification';



export const AppDrawerNavigator=createDrawerNavigator({
    Home: {
        screen: () => <AppTabNavigator/>,
     },

    Settings:{
        screen:SettingScreen
    },

    MyBartars:{
        screen:MyBartars
    },

    Notification:{
        screen:MyBartars
    },


},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
}
)