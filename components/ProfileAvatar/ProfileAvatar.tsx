"use client";

import Image from "next/image";
import { useRef } from "react";

interface ProfileAvatarProps {
  avatar: string | null;
  name: string;
  email: string;
  onUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileAvatar({
  avatar,
  name,
  email,
  onUpload,
}: ProfileAvatarProps) {
  const avatarSrc = avatar || "/img/avatar.jpg";

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="avatarContainer"
      style={{ marginBottom: "32px", textAlign: "center" }}
    >
      <div
        style={{
          width: "132px",
          height: "132px",
          borderRadius: "100%",
          overflow: "hidden",
          display: "inline-block",
        }}
      >
        <Image
          src={avatarSrc}
          alt="User avatar"
          width={132}
          height={132}
          priority
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          className="profileAvatar"
        />
      </div>

      <div className="avatarContainerText">
        <h2 className="userName">{name}</h2>
        <p className="userEmail">{email}</p>

        {onUpload && (
          <>
            <button
              type="button"
              className="loadButton"
              onClick={handleButtonClick}
            >
              Завантажити нове фото
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onUpload}
              style={{ display: "none" }}
            />
          </>
        )}
      </div>
    </div>
  );
}
