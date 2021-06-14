import styled from "styled-components";
import { FiCopy, FiDownload, FiHeart } from 'react-icons/fi';

const ShapeCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const ShapeCard = styled.div`
  width: 400px;
  min-height: 456px;
  border: 1px solid #ececec;
  border-radius: 4px;
  padding: 5px;
  margin: 5px;
  background-color: #ebebeb;
`;

const ShapeActions = styled.div`
  float: right;
`;

const ShapeName = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const Playground = styled.div`
  width: 100%;
`;

const ShapeDetails = styled.ul`
  background-color: #ebebeb;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
`;

const ShapeDetailsItems = styled.li`
  word-wrap: break-word;
`;

const ShapePallete = styled.div`
  margin-top: 5px;
`;

const ShapeCardHeader = styled.div`
  padding: 5px;
  margin: 5px;
`;

const ShapeCardSwitch = styled.div`
  margin: 5px auto auto 9px;
`;

const CopyIcon = styled(FiCopy)`
  cursor: pointer;
  &:hover {
    color: #f71b76;
  }
`;

const DownloadIcon = styled(FiDownload)`
  cursor: pointer;
  &:hover {
    color: #f71b76;
  }
`;

const LikeIcon = styled(FiHeart)`
  cursor: pointer;
  &:hover {
    color: #f71b6f;
  }
`;

export { 
  ShapeCards, 
  ShapeCard, 
  ShapeName, 
  Playground, 
  ShapeDetails, 
  ShapeDetailsItems,
  ShapeCardSwitch, 
  ShapePallete,
  CopyIcon,
  DownloadIcon,
  LikeIcon,
  ShapeActions,
  ShapeCardHeader };