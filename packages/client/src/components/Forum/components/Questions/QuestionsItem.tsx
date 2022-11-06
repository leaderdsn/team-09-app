import { Question } from '@/components/Forum/interfaces/interfaces';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useMemo } from 'react';
import { formatDistance, fromUnixTime } from 'date-fns';
import ru from 'date-fns/locale/ru';
interface IProps {
  item: Question;
  chooseTopic: (id: number) => void;
}

export const QuestionsItem = ({ item, chooseTopic }: IProps) => {
  const clickHandler = () => {
    chooseTopic(item.id);
  };

  const formattedDate = useMemo(() => {
    return formatDistance(new Date(fromUnixTime(item.creation_date)), new Date(), {
      addSuffix: true,
      locale: ru,
    });
  }, [item.creation_date]);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 ">
        <div className="flex items-center">
          <div className="mr-2"></div>

          <button className="btn-ghost btn gap-2 ">
            <MdKeyboardArrowUp />
          </button>

          <span className="w-8 text-center font-medium">{item.score}</span>
          <button className="btn-ghost btn gap-2 ">
            <MdKeyboardArrowDown />
          </button>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="ml-1">
          <div
            className="max-w-lg text-base font-extrabold tracking-tight line-clamp-1 hover:cursor-pointer"
            onClick={clickHandler}
          >
            {item.title}
          </div>
          <div className="text-sm text-slate-500"> {formattedDate}</div>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <a href={item.owner.link} target="_blank" className="flex items-center justify-center">
          <img
            className="h-10 w-10 transform rounded-full border border-gray-200 hover:scale-125 hover:cursor-pointer"
            src={item.owner.profile_image}
          />
        </a>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="avatar-group -space-x-6">
          <div className="avatar hover:scale-125 hover:cursor-pointer">
            <div className="w-10">
              <img src="https://xsgames.co/randomusers/avatar.php?g=male" />
            </div>
          </div>
          <div className="avatar hover:scale-125 hover:cursor-pointer">
            <div className="w-10">
              <img src="https://xsgames.co/randomusers/avatar.php?g=female" />
            </div>
          </div>
          <div className="avatar hover:scale-125 hover:cursor-pointer">
            <div className="w-10">
              <img src="https://api.lorem.space/image/face?w=150&h=150" />
            </div>
          </div>
          <div className="placeholder avatar hover:scale-125 hover:cursor-pointer">
            <div className="w-10 bg-neutral-focus text-neutral-content">
              <span>+99</span>
            </div>
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        {item.is_answered ? (
          <span className="rounded-full bg-green-200 py-1 px-3 text-xs text-green-600">open</span>
        ) : (
          <span className="rounded-full bg-yellow-200 py-1 px-3 text-xs text-yellow-600">
            close
          </span>
        )}
      </td>
      <td className="py-3 px-6 text-center">
        <span className="rounded-full bg-gray-200 py-1 px-3 text-xs font-bold ">
          {item.view_count}
        </span>
      </td>
      <td className="py-3 px-6 text-center">
        <span className="rounded-full bg-gray-200 py-1 px-3 text-xs font-bold ">
          {item.answer_count}
        </span>
      </td>
    </tr>
  );
};
