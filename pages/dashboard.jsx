import Link from 'next/link';

import { userService } from 'services';

export default Dashboard;

function Dashboard() {
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hola {userService.userValue?.firstName}!</h1>
                <p>You&apos;re logged in with Next.js & JWT!!</p>
                <p className={userService.userValue?.paid ? '': 'd-none'}><Link href="/users">Manage Licenses</Link></p>
            </div>
        </div>
    );
}
