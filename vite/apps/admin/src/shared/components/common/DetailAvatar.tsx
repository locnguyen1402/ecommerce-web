import { toAbsoluteUrl } from '@vklink/metronic-core';

type Props = {
  url: string | undefined;
  placeHolder?: string;
};

const DetailAvatar = ({
  url,
  placeHolder = toAbsoluteUrl('media/icons/duotune/general/gen025.svg'),
}: Props) => {
  return (
    <div
      className="image-input image-input-outline"
      data-kt-image-input="true"
      style={{ backgroundImage: `url(${toAbsoluteUrl('media/avatars/blank.png')})` }}
    >
      <div
        className="image-input-wrapper w-125px h-125px"
        style={{
          backgroundImage: url ? `url(${url})` : placeHolder ? `url(${placeHolder})` : undefined,
        }}
      ></div>
    </div>
  );
};

export { DetailAvatar };
