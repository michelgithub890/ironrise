// NAVIGATION
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from '@react-navigation/stack'
// ICONS 
import { Feather, MaterialIcons } from '@expo/vector-icons'
// MODEL
import { MODEL_COLORS } from "../models/modelColors"

// SCREENS
import AuthScreen from "../screens/AuthScreen"
import HomeScreen from '../screens/HomeScreen'
import BookScreen from "../screens/BookScreen"
import ExercicesScreen from "../screens/ExercicesScreen" 
import ExoScreen from "../screens/ExoScreen"
import RoutineScreen from "../screens/RoutineScreen"
import TestScreen from "../screens/TestScreen"
import WorkoutScreen from "../screens/WorkoutScreen"
import WorkoutExerciseScreen from "../screens/WorkoutExerciseScreen"
import StatScreen from "../screens/StatScreen"



// OBJECT NAVIGATION
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// PAGE EXERCISE + ROUTINES 
function ExercicesStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
            name="Exercices2" 
            component={ExercicesScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="Exo" component={ExoScreen} options={{ title: 'Retour', headerStyle: { backgroundColor:MODEL_COLORS.light } }}  />
        <Stack.Screen name="Routine" component={RoutineScreen} options={{ title: 'Retour', headerStyle: { backgroundColor:MODEL_COLORS.light } }}  />
      </Stack.Navigator>
    );
}


// PAGE HOME WORKOUT WORKOUT EXERCISE SCREEN 
function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="home2" 
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Workout" component={WorkoutScreen} options={{ title: 'Retour', headerStyle: { backgroundColor:MODEL_COLORS.light } }}  />
            <Stack.Screen name="WorkoutExercise" component={WorkoutExerciseScreen} options={{ title: 'Retour', headerStyle: { backgroundColor:MODEL_COLORS.light } }}  />
            <Stack.Screen name="Stats" component={StatScreen} options={{ title: 'Retour', headerStyle: { backgroundColor:MODEL_COLORS.light } }}  />
        </Stack.Navigator>
    );
}

// BOTTON TAB NAVIGATOR 
const Tabs = () => {
    return (
        <Tab.Navigator
            // GLOBAL OPTIONS NAVIGATION
            screenOptions={{
                // enleve le header du haut - remove top header
                headerShown:false,
                // enleve le titre des label - remove title label
                tabBarShowLabel:false,
                // STYLE TAB BAR (background color)
                // tabBarStyle: { backgroundColor:"#AD40AF" },
                // COLOR ICON INACTIVE
                tabBarInactiveTintColor:MODEL_COLORS.main,
                // COLOR ICON ACTIVE
                tabBarActiveTintColor:MODEL_COLORS.orange
            }}
        >
            <Tab.Screen 
                // name page
                name="Home" 
                // screen page
                component={HomeStack} 
                // options
                options={{
                    // icon
                    tabBarIcon: ({color, size}) => (
                        <Feather name="home" color={color} size={size} />
                    )
                }}
            />
            {/* <Tab.Screen 
                // name page
                name="Calendar" 
                // screen page
                component={CalendarScreen} 
                // options
                options={{
                    // icon
                    tabBarIcon: ({color, size}) => (
                        <Feather name="calendar" color={color} size={size} />
                    )
                }}
            /> */}
            <Tab.Screen 
                // name page
                name="Book" 
                // screen page
                component={BookScreen} 
                // options
                options={{
                    // icon
                    tabBarIcon: ({color, size}) => (
                        <Feather name="book-open" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen 
                // name page
                name="ExercicesStack" 
                // screen page
                component={ExercicesStack} 
                options={{
                    // icon
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="fitness-center" color={color} size={size} />
                    )
                }}
            />

            <Tab.Screen 
                // name page
                name="Auth" 
                // screen page
                component={AuthScreen} 
                // options
                options={{
                    // icon
                    tabBarIcon: ({color, size}) => (
                        <Feather name="user" color={color} size={size} />
                    )
                }}
            />

            {/* <Tab.Screen 
                // name page
                name="Test" 
                // screen page
                component={TestScreen} 
                // options
                options={{
                    // icon
                    tabBarIcon: ({color, size}) => (
                        <Feather name="user" color={color} size={size} />
                    )
                }}
            /> */}

        </Tab.Navigator>
    )
}

export default Tabs
