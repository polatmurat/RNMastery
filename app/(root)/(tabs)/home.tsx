import { initializeAuthState, verifyToken } from '@/features/reducers/authReducer';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.user)

  useEffect(() => {
    const checkToken = async () => {
      const token = await verifyToken('user-token');
      if (!token) {
        router.replace('/(auth)/welcome');
        dispatch(initializeAuthState({ userToken: null, user: null }));
      } else {
        dispatch(initializeAuthState({ userToken: token, user: jwtDecode(token) }));
      }
    };

    checkToken();
  }, [dispatch]);

  return (
    <SafeAreaView className='flex-1 justify-center items-center text-2xl'>
      {user && (
        <Text>Giriş yaptınız sayın {user.name}</Text>
      )}
    </SafeAreaView>
  );
}

export default Home;