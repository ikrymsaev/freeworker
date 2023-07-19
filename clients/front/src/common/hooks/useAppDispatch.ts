import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
