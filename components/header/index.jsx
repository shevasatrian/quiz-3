import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <div className="text-white">Logo</div>
          <div className="flex space-x-4">
            <Link href="/" className="text-white">Home</Link>
            <Link href="/notes" className="text-white">Notes</Link>
            <Link href="/" className="text-white">Menu 3</Link>
          </div>
        </nav>
      </div>
    </header>

    // <div className="flex">
    //   <ul>
    //     <li><Link href="/">Home</Link></li>
    //     <li><Link href="/profile">Profile</Link></li>
    //     <li><Link href="/users">Users</Link></li>
    //     <li><Link href="/users/detail">Users Detail</Link></li>
    //     <li><Link href="/notes">Notes</Link></li>
    //   </ul>
    // </div>
  );
}

// import styles from './styles.module.css';

// export default function Header() {
//   return <div className={styles.header}>
//     Header
//   </div>;
// }