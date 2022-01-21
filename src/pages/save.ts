export {} 

// {/* <Form onSubmit={handleSubmit}>
//               <Form.Group controlId='title' className='py-2'>
//                 <Form.Label>What's the name of this task?</Form.Label>
//                 <Form.Control
//                   required
//                   type='text'
//                   maxLength={30}
//                   value={form.title}
//                   placeholder={
//                     form.title ? form.title : 'for e.g. "Solve World Hunger"'
//                   }
//                   aria-describedby='titleHelpBlock'
//                   className={titleHelp.class}
//                   onChange={handleChange}
//                 />
//                 {titleHelp.text !== "" && (
//                   <Form.Text id='titleHelpBlock' muted>
//                     {titleHelp.text}
//                   </Form.Text>
//                 )}
//               </Form.Group>
//               <Form.Group controlId='value' className='py-2'>
//                 <Form.Label>
//                   How many Bamboo Points <BambooPoints /> is it worth?
//                 </Form.Label>
//                 <Form.Control
//                   required
//                   as='select'
//                   onChange={handleChange}
//                   defaultValue={taskSet ? taskSet.value : "DEFAULT"}
//                   aria-describedby='how many bamboo points is it worth?'
//                   className={valueHelp.class}>
//                   <option value='DEFAULT' disabled>
//                     Select a value
//                   </option>
//                   {TASK_VALUES.map((script, i) => {
//                     let value = 10 * (i + 1);
//                     return (
//                       <option
//                         key={i}
//                         value={value}
//                         //   selected={form.value === value}
//                       >
//                         {value}XP: {script}
//                       </option>
//                     );
//                   })}
//                 </Form.Control>
//                 <Form.Text id='valueHelpBlock' muted>
//                   {valueHelp.text}
//                 </Form.Text>
//               </Form.Group>
//               {!showNewCat ? (
//                 <Form.Group controlId='category'>
//                   <Form.Label>What's the category?</Form.Label>
//                   <Form.Control
//                     required
//                     as='select'
//                     onChange={handleChange}
//                     defaultValue={taskSet ? taskSet.category : "DEFAULT"}>
//                     <option value='DEFAULT' disabled>
//                       Select a category
//                     </option>
//                     {categories
//                       .filter(
//                         (c) => c !== "none" && !TASK_CATEGORIES.includes(c)
//                       )
//                       .sort()
//                       .map((c, i) => {
//                         return (
//                           <option
//                             key={i}
//                             value={c}
//                             //   selected={form.category === c}
//                           >
//                             {c}
//                           </option>
//                         );
//                       })}
//                     {TASK_CATEGORIES.map((c) => (
//                       <option
//                         key={c}
//                         value={c}
//                         //   selected={form.category === c}
//                       >
//                         {c}
//                       </option>
//                     ))}
//                     {/* <option value={NONE}>{NONE}</option>
//                     <option value='' disabled>
//                     -------
//                   </option> */}
//                   {!taskSet && (
//                     <>
//                       <option value='' disabled>
//                         -------
//                       </option>
//                       <option
//                         value='new'
//                         // selected={form.category === "new"}
//                       >
//                         create new category
//                       </option>
//                     </>
//                   )}
//                 </Form.Control>
//               </Form.Group>
//             ) : (
//               <Form.Group controlId='newCategory' className='py-2'>
//                 <Form.Label>Create new category</Form.Label>
//                 <Form.Control
//                   required
//                   type='text'
//                   maxLength={12}
//                   value={form.newCategory}
//                   placeholder='for e.g. "Knitting"'
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             )}
//             <Form.Group controlId='desc' className='py-2'>
//               <Form.Label>Describe this task (optional)</Form.Label>
//               <Form.Control
//                 required
//                 as='textarea'
//                 value={form.desc}
//                 rows={2}
//                 placeholder={
//                   taskSet
//                     ? taskSet.desc
//                     : 'for e.g. "Put food before trade, find balance with nature&apos;s systems"'
//                 }
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             {!taskSet && (
//               <Form.Group controlId='deadline' className='py-2'>
//                 <Form.Label>Give it a deadline (optional)</Form.Label>
//                 <Form.Control
//                   type='date'
//                   min={min}
//                   max={max}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             )}
//             {taskSet ? (
//               <ul>
//                 {taskSet.sharedWith && taskSet.sharedWith.length > 1 ? (
//                   <>
//                     <li>Any edits you make will be shared with</li>
//                     <div className='ml-3'>
//                       {taskSet.sharedWith
//                         .filter((id) => id !== my_user._id)
//                         .map((id, i) => {
//                           const username = getUsernameById(followedUsers, id);
//                           return (
//                             <div key={i}>
//                               <ICOUSER /> {username}
//                             </div>
//                           );
//                         })}
//                     </div>
//                     <li>
//                       You will only accrue Bamboo Points if you complete it.
//                     </li>
//                   </>
//                 ) : taskSet.type === TEAM ? (
//                   <li>
//                     This task is no longer shared because other users have
//                     removed themselves.
//                   </li>
//                 ) : (
//                   <li>This task is not shared.</li>
//                 )}
//                 {taskSet.createdBy !== my_user._id ? (
//                   <li>You can remove yourself from this task.</li>
//                 ) : (
//                   <li>Only you can delete this task.</li>
//                 )}
//                 {taskSet.repeats === NEVER ? (
//                   <li>This task is never repeated.</li>
//                 ) : (
//                   <li>This task is repeated {taskSet.repeats}.</li>
//                 )}
//               </ul>
//             ) : showRepeat ? (
//               <Form.Group controlId='repeated'>
//                 <Form.Label>Does it repeat?</Form.Label>
//                 <div className='mb-3'>
//                   <Form.Check
//                     inline
//                     label='yes'
//                     name='group1'
//                     type='radio'
//                     value='yes'
//                     onChange={handleChange}
//                   />
//                   <Form.Check
//                     inline
//                     label='no'
//                     name='group1'
//                     type='radio'
//                     value='no'
//                     onChange={handleChange}
//                   />
//                 </div>
//               </Form.Group>
//             ) : showRepeatOptions ? (
//               <Form.Group
//                 controlId='repeats'
//                 aria-describedby='repeatsHelpBlock'>
//                 <Form.Label>How often?</Form.Label>
//                 <div className='mb-3'>
//                   <Form.Check
//                     inline
//                     label='daily*'
//                     name='group1'
//                     type='radio'
//                     value='daily'
//                     onChange={handleChange}
//                   />
//                   <Form.Check
//                     inline
//                     label='weekly*'
//                     name='group1'
//                     type='radio'
//                     value='weekly'
//                     onChange={handleChange}
//                   />
//                   <Form.Check
//                     inline
//                     label='monthly*'
//                     name='group1'
//                     type='radio'
//                     value='monthly'
//                     onChange={handleChange}
//                   />
//                   <Form.Check
//                     inline
//                     label='other'
//                     name='group1'
//                     type='radio'
//                     value='other'
//                     onChange={handleChange}
//                   />
//                   <Form.Check
//                     inline
//                     label='never'
//                     name='group1'
//                     type='radio'
//                     value='never'
//                     onChange={handleChange}
//                   />
//                   <Form.Text id='repeatsHelpBlock' muted>
//                     * If set to repeat, tasks will be created for 28 days, 10
//                     weeks or 12 months by default. Don't want this? Select
//                     'other' and choose the number of repeats!
//                   </Form.Text>
//                 </div>
//                 <div></div>
//               </Form.Group>
//             ) : showOtherRepeat ? (
//               <Row>
//                 <Col>Task repeats</Col>
//                 <Col>
//                   <Form.Group controlId='repeatsOther'>
//                     <Form.Control
//                       as='select'
//                       onChange={handleChange}
//                       defaultValue='2'>
//                       <option value='1'>Daily</option>
//                       <option value='7'>Weekly</option>
//                       <option value='28'>Monthly</option>
//                       <option value='2'>Every other day</option>
//                       <option value='3'>Every third day</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col sm={12}>
//                   <Form.Group as={Row} controlId='repetitions'>
//                     <Col>
//                       To a total of{" "}
//                       <Form.Control
//                         type='text'
//                         onChange={handleChange}
//                         value={form.repetitions}></Form.Control>
//                       repetitions
//                     </Col>
//                   </Form.Group>
//                 </Col>
//               </Row>
//             ) : (
//               <></>
//             )}
//             {showShared ? (
//               <Form.Group controlId='shared'>
//                 <Form.Label>Is it shared?</Form.Label>
//                 <div className='mb-3'>
//                   <Form.Check
//                     inline
//                     label='yes'
//                     name='group1'
//                     type='radio'
//                     value='yes'
//                     onChange={handleChange}
//                   />
//                   <Form.Check
//                     inline
//                     label='no'
//                     name='group1'
//                     type='radio'
//                     value='no'
//                     onChange={handleChange}
//                   />
//                 </div>
//               </Form.Group>
//             ) : showSharedDropdown ? (
//               <Form.Group controlId='sharedWith'>
//                 <Form.Label>Who would you like to share it with?</Form.Label>
//                 {form.sharedWith.length > 0 && (
//                   <Form.Text>
//                     {form.sharedWith.map((id) => {
//                       const username = getUsernameById(followedUsers, id);
//                       return (
//                         <span className='mr-3' key={id}>
//                           {username}{" "}
//                           <XButton
//                             value={id}
//                             handleClick={removeUserFromShared}
//                           />
//                         </span>
//                       );
//                     })}
//                   </Form.Text>
//                 )}
//                 <Form.Control
//                   required
//                   as='select'
//                   onChange={handleChange}
//                   aria-describedby='sharedWithHelpBlock'
//                   defaultValue={["DEFAULT"]}
//                   multiple>
//                   <option value='DEFAULT' disabled>
//                     Select a user
//                   </option>
//                   {followedUsers.map((u) => (
//                     <option key={u._id} value={`${u._id}/${u.username}`}>
//                       {u.username}
//                     </option>
//                   ))}
//                 </Form.Control>
//                 {followedUsers.length < 1 && (
//                   <Form.Text id='sharedWithHelpBlock' muted>
//                     No one to share with? Add users at the 'following' page.
//                   </Form.Text>
//                 )}
//               </Form.Group>
//             ) : (
//               <></>
//             )}
//           </Form> */}