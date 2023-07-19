import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/reducers';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
