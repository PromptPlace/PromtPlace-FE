/**
 * 프롬프트 카드 그리드 컴포넌트입니다.
 * 프롬프트 배열을 넘겨 사용하면 됩니다
 *
 * @param {Prompt[]} prompts - 프롬프트 배열
 *
 * @example
 * <PromptGrid prompts={[{...}, {...}]} />
 *
 * @author 곽도윤
 * **/

import type { Prompt } from '@/types/MainPage/prompt';
import React from 'react';
import PromptCard from './PromptCard';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1126,
      lg: 1440,
      xl: 1754,
    },
  },
});

const PromptGrid = ({ prompts }: { prompts: Prompt[] }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
            xl: 'repeat(5, 1fr)',
          },

          gap: {
            xs: '20px',
            sm: '24px',
            md: '28px',
            lg: '32px',
            xl: '36px',
          },
          maxWidth: {
            xs: '688px',
            sm: '922px',
            md: '1236px',
            lg: '1550px',
            xl: '1716px',
          },

          marginY: '20px',
        }}>
        {prompts.map((prompt) => (
          <PromptCard key={prompt.prompt_id} prompt={prompt} />
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default PromptGrid;
