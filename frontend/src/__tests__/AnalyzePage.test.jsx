// __tests__/AnalyzePage.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AnalyzePage from '../components/AnalyzePage';
import { vi } from 'vitest';

vi.mock('axios');  // axios mocking

describe('AnalyzePage 컴포넌트', () => {

  beforeEach(() => {
    axios.post.mockClear();
  });

  test('렌더링이 정상적으로 되는지 확인', () => {
    render(<AnalyzePage />);
    expect(screen.getByText(/이력서 PDF 분석/i)).toBeInTheDocument();
  });

  test('PDF 파일 선택 시 파일명이 정상적으로 표시되는지 확인', () => {
    const { container } = render(<AnalyzePage />);
    const fileInput = container.querySelector('input[type="file"]');

    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText(/선택된 파일: test.pdf/i)).toBeInTheDocument();
  });

  test('PDF 외 파일 선택 시 에러 메시지 출력 확인', () => {
    const { container } = render(<AnalyzePage />);
    const fileInput = container.querySelector('input[type="file"]');

    const invalidFile = new File(['dummy content'], 'test.txt', { type: 'text/plain' });

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(screen.getByText(/PDF 파일만 업로드 가능합니다/i)).toBeInTheDocument();
  });

  test('분석 요청 버튼 클릭 시 axios 호출 여부 확인', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const { container } = render(<AnalyzePage />);
    const fileInput = container.querySelector('input[type="file"]');

    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const analyzeButton = screen.getByText(/분석 요청/i);
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

});
