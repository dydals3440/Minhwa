import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../components/context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();
  if (!user || (requireAdmin && !user.isAdmin)) {
    // replace, replace = true와 동일, 이동할 떄 잘못들어온 것이므로 현재 경로를 history에 넣고 싶지 않으므로 replace라고 작성. 자세한건 문서참조
    return <Navigate to='/' replace />;
  }
  //  admin 권한이 있는 경우에는, children을 보여지도록 함.
  return children;
}

// 로그인 한 사용자가 있는지 확인
// 그 사용자가 어드민 권한이 있는지 확인
// requireAdmin이 true인 경우에는 로그인도 되어 있어야 하고, 어드민 권한도 갖고 있어야 합니다.
// 조건에 맞지 않으면 / 상위 경로로 이동,
// 조건에 맞는 경우에만 전달된 children(해당 페이지)을 보여줌
