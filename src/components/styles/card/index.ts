import styled, { css } from 'styled-components'

export const Card = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    margin: 50% 0;
    max-height: fit-content;
    padding: 15px;
  `}
`
