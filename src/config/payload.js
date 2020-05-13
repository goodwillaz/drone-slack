export const started = {
  text: ''
};

export const completed = {
  text: '',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ''
      }
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Build Log'
          },
          url: '',
          style: ''
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Build Activity'
          },
          url: ''
        }
      ]
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: ''
        }
      ]
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: ''
        },
        {
          type: 'mrkdwn',
          text: ''
        }
      ]
    }
  ]
};
