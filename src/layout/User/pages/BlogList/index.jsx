

import React, { useEffect, useState } from 'react'
import classNames from "classnames/bind";
import styles from "./blogList.module.scss";
import HeadBlogList from './HeadBlogList';
import Container from '@/components/Container';
import BodyBlogList from './BodyBlogList';
import { useLocation, useParams } from 'react-router-dom';
import userService from '@/services/userService';
import { TAGS } from '@/constant/value';
import useQuery from '@/hooks/useQuery';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const BlogList = () => {
   let { id } = useParams();
   let location = useLocation();
   let [listHead, setListHead] = useState([]);
   let [list1, setList1] = useState([]);
   let [list2, setList2] = useState([]);
   let [list3, setList3] = useState([]);
   const {
      data: handbookData,
   } = useQuery(() => userService.getHandbook({ tags: TAGS[2].label + "," + TAGS[4].label + "," + TAGS[5].label, limit: 100 }));
   useEffect(() => {
      if (handbookData?.DT.length > 0) {
         let _list1 = [];
         let _list2 = [];
         let _list3 = [];
         handbookData.DT.map((item) => {
            if (item.tags.includes(TAGS[2].label)) {
               _list1.push(item);
            } if (item.tags.includes(TAGS[4].label)) {
               _list2.push(item);
            } if (item.tags.includes(TAGS[5].label)) {
               _list3.push(item);
            }
         })
         if (id == TAGS[2].value) {
            setListHead(_list1)
         } else if (id == TAGS[4].value) {
            setListHead(_list2)
         } else {
            setListHead(_list3)
         }
         setList1(_list1);
         setList2(_list2);
         setList3(_list3);
      }
   }, [handbookData, location])
   return (

      <Container >
         {listHead?.length > 0 && <HeadBlogList
            list={listHead}
            id={id - 1} />}
         {list1?.length > 0 && list2?.length > 0 && list3?.length > 0 && <BodyBlogList
            list1={list1}
            list2={list2}
            list3={list3}
         />}

      </Container>


   )
}

export default BlogList