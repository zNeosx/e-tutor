// import React from 'react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '../ui/dropdown-menu';
// import { signOut } from '@/auth';
// import { getInitials } from '@/lib/utils';
// import { IKImage } from 'imagekitio-next';

// import { env } from '@/env';
// import { Session } from 'next-auth';
// import Link from 'next/link';

// const UserDropdown = ({
//   session,
//   items,
// }: {
//   session: Session;
//   items: {
//     label: string;
//     isLink: boolean;
//     href?: string;
//     onClick?: () => void;
//   }[];
// }) => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <Avatar>
//           {session.user.image ? (
//             <IKImage
//               urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
//               path={session.user.image}
//               width={48}
//               height={48}
//               alt={'User Avatar'}
//               className="rounded-full object-cover"
//             />
//           ) : null}
//           <AvatarFallback>
//             {getInitials(session.user?.name ?? 'U')}
//           </AvatarFallback>
//         </Avatar>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         {items.map((item, index) => (
//           <DropdownMenuItem key={index} onClick={item.onClick}>
//             {item.isLink && item.href ? (
//               <Link href={item.href}>{item.label}</Link>
//             ) : (
//               item.label
//             )}
//           </DropdownMenuItem>
//         ))}
//         <DropdownMenuItem
//           onClick={() =>
//             signOut({
//               redirectTo: '/auth/sign-in',
//             })
//           }
//         >
//           Log out
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default UserDropdown;
