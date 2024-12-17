/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axiosClient from "Services/axiosClient";
import { ServerResponse } from "Types/serverResponse.types";
import { User } from "Types/user.types";
import { debounceLeading } from "Utils/helpers";

const getUsers = async (withCsrf: boolean): Promise<ServerResponse<User[]>> => {
  try {
    const res = await axiosClient.get(`/v1/users`, {
      headers: { "with-csrf": withCsrf },
    });
    return new ServerResponse({ data: res.data.data });
  } catch (e: any) {
    return new ServerResponse({ error: e?.response?.data });
  }
};

function App() {
  const [error, setError] = useState<ServerResponse<any>["error"]>();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllUsers = debounceLeading(async (withCsrf = true) => {
    if (isLoading) return;

    setError(undefined);
    setIsLoading(true);

    const res = await getUsers(withCsrf);

    if (res.data) {
      setUsers(res.data);
    } else {
      setError(res.error);
    }

    setIsLoading(false);
  });

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-screen h-dvh px-16">
      <div className="py-16 max-w-7xl h-full mx-auto bg-gray-200 dark:bg-[#333]">
        <h1 className="text-4xl font-black mb-4 text-center">CSRF with RSA</h1>

        {(() => {
          if (isLoading) {
            return <p className="text-center w-full text-xl animate-pulse">Loading...</p>;
          }

          if (error) {
            return <p className="text-center text-red-600">{error.message}</p>;
          }

          return (
            <div className="flex flex-col gap-4 max-w-4xl mx-auto px-4">
              {users.map((user) => (
                <div
                  className={`py-4 px-4 border rounded-md ${
                    user.isActive ? "border-gray-300" : "border-red-300"
                  }`}
                  key={user.id}
                >
                  {user.name}
                </div>
              ))}
            </div>
          );
        })()}
        <div className="max-w-4xl mx-auto px-4 flex justify-center gap-2 mt-4">
          <button
            onClick={() => getAllUsers(true)}
            className="px-4 py-2 rounded-md bg-green-600 text-white"
          >
            Fetch with CSRF
          </button>
          <button
            onClick={() => getAllUsers(false)}
            className="px-4 py-2 rounded-md bg-purple-700 text-white"
          >
            Fetch without CSRF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
