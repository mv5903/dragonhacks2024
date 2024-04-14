import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useState } from 'react';
import Button from '../misc/Button';

export default function Navbar({setTab}) {
    const { user, isLoading } = useUser();

    return (
        <div className="flex justify-between w-full p-3">
          <div>
            <a className="btn btn-ghost text-xl">Mathathon</a>
          </div>
          <div className={`text-center ${user ? 'ms-[9%]' : ''}`}>
            {
              user &&
              <ul className="menu menu-horizontal px-1">
                <li><a onClick={() => setTab('roadmap')}>Roadmap</a></li>
                <li><a onClick={() => setTab('progress')}>Progress</a></li>
              </ul>
            }
          </div>
          <div>
            {
              user 
              ?
              <div className='flex justify-content-end place-items-center gap-3'>
                <p>Hi, {user.name}</p>
                <Button url="/api/auth/logout" btnType="primary" label="Log out" />
              </div>
              :
              <Button url="/api/auth/login" btnType="primary" label="Log in" />
            }
          </div>
      </div>
    )
}