export const yesNoOptions = [
  { label: "Да", value: "yes" },
  { label: "Нет", value: "no" }
];

export const serviceSchemas = {
  live: {
    serviceLabel: "Прямая трансляция",
    sections: [
      {
        id: "general",
        title: "Общая информация",
        fields: [
          { type: "text", name: "event_name", label: "Название мероприятия" },
          { type: "text", name: "city", label: "Город" },
          { type: "text", name: "venue", label: "Площадка (название + адрес)" },
          { type: "date", name: "event_date", label: "Дата" },
          { type: "time", name: "event_time_start", label: "Время начала" },
          { type: "time", name: "event_time_end", label: "Время окончания" },
          { type: "text", name: "contact_name", label: "Контактное лицо по мероприятию (ФИО)" },
          { type: "tel", name: "contact_phone", label: "Телефон" },
          { type: "email", name: "contact_email", label: "Email" },
          { type: "text", name: "decision_maker", label: "Кто принимает финальные решения? (ФИО/роль)" }
        ]
      },
      {
        id: "format",
        title: "Формат трансляции",
        fields: [
          {
            type: "select",
            name: "stream_format",
            label: "Формат",
            options: [
              { label: "Онлайн", value: "online" },
              { label: "Офлайн + запись", value: "offline_record" },
              { label: "Гибрид", value: "hybrid" }
            ]
          },
          {
            type: "number",
            name: "offline_attendees",
            label: "Офлайн участников (число)",
            hint: "если не нужно — 0"
          },
          {
            type: "number",
            name: "online_viewers",
            label: "Онлайн зрителей (число)",
            hint: "если не нужно — 0"
          },
          {
            type: "select",
            name: "platform",
            label: "Платформа",
            options: [
              { label: "YouTube", value: "youtube" },
              { label: "VK", value: "vk" },
              { label: "Telegram", value: "telegram" },
              { label: "Mediator", value: "mediator" },
              { label: "Tolq", value: "tolq" },
              { label: "Другое", value: "other" }
            ]
          },
          {
            type: "text",
            name: "platform_other",
            label: "Другое (напишите сами)",
            showWhen: "platform:other"
          },
          { type: "text", name: "platform_link", label: "Ссылка/канал/аккаунт" },
          { type: "select", name: "need_recording", label: "Нужна запись эфира?", options: yesNoOptions },
          {
            type: "select",
            name: "need_publish",
            label: "Нужна публикация записи после?",
            options: yesNoOptions
          },
          { type: "textarea", name: "format_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "stage",
        title: "Спикеры и сцена",
        fields: [
          { type: "number", name: "speakers_total", label: "Спикеров всего (число)" },
          { type: "number", name: "speakers_in_frame", label: "Одновременно в кадре (число)" },
          {
            type: "select",
            name: "speaker_position",
            label: "Расположение",
            options: [
              { label: "Сидя", value: "seated" },
              { label: "Стоя", value: "standing" },
              { label: "У трибуны", value: "podium" },
              { label: "Свободное перемещение", value: "free" },
              { label: "Другое", value: "other" }
            ]
          },
          {
            type: "text",
            name: "speaker_position_other",
            label: "Другое (напишите сами)",
            showWhen: "speaker_position:other"
          },
          {
            type: "select",
            name: "questions_from_audience",
            label: "Вопросы из зала?",
            options: yesNoOptions
          },
          {
            type: "select",
            name: "remote_connections",
            label: "Удалённые подключения?",
            options: yesNoOptions
          },
          {
            type: "number",
            name: "remote_connections_count",
            label: "Если да: сколько подключений",
            showWhen: "remote_connections:yes"
          },
          { type: "textarea", name: "stage_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "screens",
        title: "Презентации и экраны",
        fields: [
          {
            type: "select",
            name: "has_presentations",
            label: "Будут презентации?",
            options: yesNoOptions
          },
          {
            type: "select",
            name: "presentation_in_stream",
            label: "Выводить презентацию в трансляцию?",
            options: yesNoOptions,
            showWhen: "has_presentations:yes"
          },
          {
            type: "select",
            name: "presenter_mode",
            label: "Нужен режим докладчика?",
            options: yesNoOptions,
            showWhen: "has_presentations:yes"
          },
          {
            type: "number",
            name: "clickers",
            label: "Кликер (число)",
            hint: "0 если не нужен",
            showWhen: "has_presentations:yes"
          },
          {
            type: "text",
            name: "hall_screens",
            label: "Какие экраны есть в зале?",
            showWhen: "has_presentations:yes"
          },
          {
            type: "select",
            name: "speaker_on_screens",
            label: "Выводить картинку со спикером на экраны в зале?",
            options: yesNoOptions,
            showWhen: "has_presentations:yes"
          },
          {
            type: "select",
            name: "side_screens",
            label: "Есть боковые экраны?",
            options: yesNoOptions,
            showWhen: "has_presentations:yes"
          },
          {
            type: "select",
            name: "side_screens_responsible",
            label: "Если да: кто отвечает за подключение?",
            options: [
              { label: "Площадка", value: "venue" },
              { label: "Наша команда", value: "team" },
              { label: "Не знаю", value: "unknown" }
            ],
            showWhen: "side_screens:yes"
          },
          { type: "textarea", name: "screens_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "teleprompter",
        title: "Суфлёр и устройства",
        fields: [
          { type: "select", name: "teleprompter_needed", label: "Суфлёр нужен?", options: yesNoOptions },
          {
            type: "number",
            name: "teleprompter_count",
            label: "Если да: сколько",
            showWhen: "teleprompter_needed:yes"
          },
          {
            type: "number",
            name: "tablets",
            label: "Планшеты (число)",
            hint: "0 если не нужны"
          },
          { type: "textarea", name: "teleprompter_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "audio",
        title: "Звук",
        fields: [
          { type: "select", name: "venue_audio", label: "Есть звук на площадке?", options: yesNoOptions },
          { type: "number", name: "venue_mics", label: "Сколько микрофонов предоставляет площадка?" },
          { type: "number", name: "total_mics", label: "Сколько микрофонов нужно всего?" },
          { type: "number", name: "handheld_mics", label: "Ручные микрофоны (число)", hint: "0 если не нужно" },
          { type: "number", name: "headsets", label: "Гарнитуры (число)", hint: "0 если не нужно" },
          { type: "textarea", name: "audio_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "signal",
        title: "Видео и вывод сигнала",
        fields: [
          {
            type: "select",
            name: "signal_output",
            label: "Нужно выводить картинку с камер/трансляции куда-то дополнительно?",
            options: yesNoOptions
          },
          {
            type: "multiCheckbox",
            name: "signal_targets",
            label: "Если да: куда",
            options: [
              { label: "Экраны в зале", value: "hall_screens" },
              { label: "Проектор", value: "projector" },
              { label: "LED-экран", value: "led" },
              { label: "Другое", value: "other" }
            ],
            showWhen: "signal_output:yes"
          },
          {
            type: "text",
            name: "signal_targets_other",
            label: "Другое (напишите сами)",
            showWhen: "signal_targets:other",
            showMode: "includes"
          },
          {
            type: "select",
            name: "need_graphics",
            label: "Нужны титры/заставка/логотип в эфире?",
            options: yesNoOptions
          },
          {
            type: "text",
            name: "graphics_desc",
            label: "Если да: описание",
            showWhen: "need_graphics:yes"
          },
          { type: "textarea", name: "signal_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "internet",
        title: "Интернет и техусловия площадки",
        fields: [
          { type: "select", name: "wired_internet", label: "Проводной интернет?", options: yesNoOptions },
          { type: "select", name: "wifi", label: "Wi-Fi?", options: yesNoOptions },
          {
            type: "text",
            name: "upload_speed",
            label: "Upload скорость (Мбит/с)",
            placeholder: "например: 50 или не знаю"
          },
          {
            type: "select",
            name: "backup_internet",
            label: "Резервный интернет?",
            options: [
              { label: "Да", value: "yes" },
              { label: "Нет", value: "no" },
              { label: "Не знаю", value: "unknown" }
            ]
          },
          { type: "select", name: "director_table", label: "Место для режиссёрского стола?", options: yesNoOptions },
          {
            type: "text",
            name: "venue_contact",
            label: "Контакт ответственного за площадку (ФИО, телефон)"
          },
          { type: "textarea", name: "internet_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "build",
        title: "Застройка и подготовка",
        description:
          "Обычно монтаж требует минимум 4 часа до старта, иногда — подготовка накануне.",
        fields: [
          {
            type: "text",
            name: "build_time",
            label: "Время застройки",
            placeholder: "например: с 08:00 при старте в 12:00"
          },
          { type: "textarea", name: "build_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "post",
        title: "После мероприятия",
        fields: [
          { type: "select", name: "deliver_raw", label: "Передача исходников?", options: yesNoOptions },
          { type: "select", name: "full_edit", label: "Монтаж полной записи?", options: yesNoOptions },
          { type: "select", name: "clip_cuts", label: "Нарезка клипов после?", options: yesNoOptions },
          { type: "text", name: "final_delivery", label: "Формат передачи финала" },
          { type: "textarea", name: "post_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "final",
        title: "Дополнительные комментарии",
        fields: [{ type: "textarea", name: "general_comment", label: "Общий комментарий" }]
      }
    ]
  },
  video: {
    serviceLabel: "Видеосъёмка",
    sections: [
      {
        id: "general",
        title: "Общая информация",
        fields: [
          { type: "text", name: "project_name", label: "Название проекта" },
          { type: "text", name: "deadline", label: "Дедлайн" },
          { type: "text", name: "contact_name", label: "Контактное лицо (ФИО)" },
          { type: "tel", name: "contact_phone", label: "Телефон" },
          { type: "email", name: "contact_email", label: "Email" },
          {
            type: "textarea",
            name: "publish_place",
            label: "Где будет опубликовано видео? (текст + ссылки)"
          }
        ]
      },
      {
        id: "type",
        title: "Тип видео",
        fields: [
          {
            type: "select",
            name: "video_type",
            label: "Тип",
            options: [
              { label: "Промо", value: "promo" },
              { label: "Интервью", value: "interview" },
              { label: "Обучающее", value: "education" },
              { label: "Отчётное", value: "report" },
              { label: "Имиджевое", value: "image" },
              { label: "Reels & Shorts", value: "reels" },
              { label: "Другое", value: "other" }
            ]
          },
          {
            type: "text",
            name: "video_type_other",
            label: "Другое (напишите сами)",
            showWhen: "video_type:other"
          },
          { type: "textarea", name: "type_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "format",
        title: "Формат",
        fields: [
          {
            type: "select",
            name: "orientation",
            label: "Ориентация",
            options: [
              { label: "Вертикальный", value: "vertical" },
              { label: "Горизонтальный", value: "horizontal" },
              { label: "Оба", value: "both" }
            ]
          },
          { type: "textarea", name: "format_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "goal",
        title: "Цель видео",
        fields: [
          {
            type: "textarea",
            name: "goal",
            label: "Что должно произойти после просмотра?",
            hint:
              "Примеры: оставить заявку, зарегистрироваться, понять продукт, согласиться на встречу, купить, поверить бренду, донести ключевой тезис, объяснить сложную технологию."
          },
          { type: "text", name: "goal_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "audience",
        title: "Аудитория",
        fields: [
          { type: "textarea", name: "audience_who", label: "Кто будет смотреть?" },
          {
            type: "select",
            name: "audience_type",
            label: "B2B/массовая?",
            options: [
              { label: "B2B", value: "b2b" },
              { label: "Массовая", value: "mass" }
            ]
          },
          { type: "textarea", name: "audience_level", label: "Уровень подготовки аудитории" },
          { type: "textarea", name: "audience_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "script",
        title: "Сценарий и контент",
        fields: [
          { type: "select", name: "has_script", label: "Есть готовый сценарий?", options: yesNoOptions },
          {
            type: "select",
            name: "need_script_help",
            label: "Нужна помощь в разработке сценария?",
            options: yesNoOptions
          },
          { type: "textarea", name: "references", label: "Референсы (ссылки)" },
          { type: "select", name: "need_voice", label: "Нужен диктор?", options: yesNoOptions },
          {
            type: "select",
            name: "need_graphics",
            label: "Нужна графика/инфографика?",
            options: yesNoOptions
          },
          { type: "textarea", name: "script_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "shooting",
        title: "Съёмка",
        fields: [
          { type: "text", name: "shooting_location", label: "Где будет проходить съёмка?" },
          { type: "textarea", name: "location_constraints", label: "Есть ли ограничения по площадке?" },
          { type: "textarea", name: "shooting_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "editing",
        title: "Монтаж",
        fields: [
          { type: "select", name: "need_subtitles", label: "Нужны субтитры?", options: yesNoOptions },
          { type: "select", name: "need_social", label: "Нужна адаптация под соцсети?", options: yesNoOptions },
          {
            type: "text",
            name: "revision_rounds",
            label: "Сколько раундов правок предполагается?"
          },
          { type: "text", name: "rough_cut_deadline", label: "Есть дедлайн на черновой монтаж?" },
          { type: "textarea", name: "editing_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "stop",
        title: "Чего точно не должно быть",
        fields: [{ type: "textarea", name: "stop_list", label: "Запрещённые вещи/стоп-лист" }]
      },
      {
        id: "comments",
        title: "Комментарии",
        fields: [{ type: "textarea", name: "general_comment", label: "Общий комментарий" }]
      },
      {
        id: "attachments",
        title: "Вложения",
        fields: [
          {
            type: "file",
            name: "attachments",
            label: "Прикрепить файлы (опционально): ТЗ, презентации, брендбук, сценарий, референсы",
            multiple: true
          }
        ]
      }
    ]
  },
  support: {
    serviceLabel: "Техническая поддержка",
    sections: [
      {
        id: "when",
        title: "Когда и где",
        fields: [
          { type: "date", name: "support_date", label: "Дата" },
          { type: "time", name: "support_time", label: "Время" },
          { type: "text", name: "address", label: "Адрес" },
          { type: "text", name: "room", label: "Номер помещения/переговорной (опционально)" },
          { type: "textarea", name: "access_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "task",
        title: "Что нужно сделать",
        fields: [
          {
            type: "textarea",
            name: "task_description",
            label: "Свободное описание задачи"
          }
        ]
      },
      {
        id: "on-site",
        title: "Что есть на площадке",
        fields: [
          { type: "textarea", name: "on_site_equipment", label: "Свободное поле" },
          { type: "textarea", name: "on_site_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "bring",
        title: "Нужно ли привезти оборудование",
        fields: [
          { type: "textarea", name: "need_to_bring", label: "Свободное поле" },
          { type: "textarea", name: "bring_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "duration",
        title: "Длительность работы",
        fields: [
          {
            type: "text",
            name: "duration",
            label: "Свободное поле",
            placeholder: "например: с 12:00 до 16:00 нужен специалист на весь период"
          },
          { type: "textarea", name: "duration_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "contact",
        title: "Контакт на площадке",
        fields: [
          { type: "text", name: "contact_name", label: "ФИО" },
          { type: "tel", name: "contact_phone", label: "Телефон" },
          { type: "text", name: "contact_backup", label: "Резервный контакт (опционально)" },
          { type: "textarea", name: "contact_comment", label: "Доп. комментарий", optional: true }
        ]
      },
      {
        id: "comments",
        title: "Комментарии",
        fields: [{ type: "textarea", name: "general_comment", label: "Общий комментарий" }]
      }
    ]
  }
};
