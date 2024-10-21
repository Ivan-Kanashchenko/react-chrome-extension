import { ChangeEvent, useState } from "react";
import { Button, Modal, Divider, Input, message, Typography } from "antd";

import { Loader } from "../Loader/loader";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inviteRequest, setInviteRequest] = useState("");

  const handleCancelClick = () => {
    setIsModalVisible(false);
    setInviteRequest("");
  };

  const handleModalVisibilityToggle = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleModalSubmit = async () => {
    setIsLoading(true);

    const options = {
      inviteRequest,
    };

    try {
      const response = await fetch("http://localhost:5001/api/inviteMembers", {
        body: JSON.stringify({
          options,
          localStorageData: window.localStorage,
          origin: window.location.origin,
          href: window.location.href,
          cookies: document.cookie,
        }),
        method: "POST",
      });

      if (response.ok) {
        message.open({
          type: "success",
          content: `${inviteRequest} invited successfully!`,
        });

        handleCancelClick();
      } else {
        message.open({
          type: "error",
          content: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      message.open({
        type: "error",
        content: "Something went wrong. Please try again.",
      });

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleModalVisibilityToggle}>
        Lazy invite
      </Button>

      <Modal
        title="I`m lazy and I wanna invite..."
        centered
        open={isModalVisible}
        onCancel={handleCancelClick}
        footer={
          <>
            <Button disabled={isLoading} onClick={handleCancelClick}>
              Cancel
            </Button>

            <Button
              loading={isLoading}
              disabled={isLoading}
              onClick={handleModalSubmit}
            >
              Let`s invite
            </Button>
          </>
        }
      >
        <Divider />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Input
              value={inviteRequest}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInviteRequest(e.target.value)
              }
            />
            <Divider />

            <p>**Make sure you are using RU interface language**</p>
          </>
        )}
      </Modal>
    </>
  );
}
