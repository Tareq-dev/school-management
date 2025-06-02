-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2025 at 05:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`) VALUES
(1, 'Class 1'),
(2, 'Class 2'),
(3, 'Class 3'),
(4, 'Class 4'),
(5, 'Class 5'),
(7, 'Class 6');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `salary` int(20) NOT NULL,
  `joining_salary` int(20) DEFAULT NULL,
  `subject` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `employee_id`, `name`, `designation`, `salary`, `joining_salary`, `subject`, `email`, `phone`, `gender`, `address`, `joining_date`, `photo`) VALUES
(1, 'TCH001', 'Abdul Karim', 'Senior Teacher', 21000, 21000, 'Mathematics', 'karim@example.com', '01711112222', 'Male', 'Dhaka', '2020-01-15', 'karim.jpg'),
(2, 'TCH002', 'Shirin Akter', 'Assistant Teacher', 23000, 23000, 'English', 'shirin@example.com', '01722223333', 'Female', 'Chittagong', '2019-05-20', 'shirin.jpg'),
(4, 'TCH004', 'Nazmul Huda', 'Assistant Teacher', 13500, 12000, 'Chemistry', 'nazmul@example.com', '01744445555', 'Male', 'Sylhet', '2021-03-18', 'nazmul.jpg'),
(5, 'TCH005', 'Anika Sultana', 'Senior Teacher', 14000, 14000, 'Biology', 'anika@example.com', '01755556666', 'Female', 'Khulna', '2017-11-05', 'anika.jpg'),
(6, 'TCH006', 'Fahim Hasan', 'Junior Teacher', 23000, 23000, 'Bangla', 'fahim@example.com', '01766667777', 'Male', 'Barisal', '2022-06-01', 'fahim.jpg'),
(7, 'TCH007', 'Rumana Islam', 'Assistant Teacher', 14000, 14000, 'Geography', 'rumana@example.com', '01777778888', 'Female', 'Comilla', '2020-09-25', 'rumana.jpg'),
(8, 'TCH008', 'Shafayet Hossain', 'Senior Teacher', 11000, 11000, 'History', 'shafayet@example.com', '01788889999', 'Male', 'Mymensingh', '2016-12-12', 'shafayet.jpg'),
(9, 'TCH009', 'Maruf Ahmed', 'Junior Teacher', 17000, 17000, 'ICT', 'maruf@example.com', '01799990000', 'Male', 'Rangpur', '2023-01-10', 'maruf.jpg'),
(10, 'TCH010', 'Nusrat Jahan', 'Assistant Teacher', 13000, 13000, 'Religion', 'nusrat@example.com', '01800001111', 'Female', 'Gazipur', '2021-07-20', 'nusrat.jpg'),
(13, 'EMP11', 'Tahmina Tammy', 'Junior Teacher', 21200, 20000, 'Physics', 'tahmina@gmail.com', '01568035999', 'Female', 'Saraipara, Chittagong, BD', '2025-05-25', 'Tahmina_c_EMP11.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `employees_attendance`
--

CREATE TABLE `employees_attendance` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(50) NOT NULL,
  `attendance_date` date NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees_attendance`
--

INSERT INTO `employees_attendance` (`id`, `employee_id`, `attendance_date`, `status`) VALUES
(17, 'TCH009', '2025-05-28', 'present'),
(18, 'TCH004', '2025-05-28', 'absent'),
(19, 'TCH009', '2025-05-20', 'absent'),
(20, 'TCH004', '2025-05-20', 'present'),
(31, 'TCH006', '2025-06-20', 'present'),
(32, 'TCH007', '2025-06-20', 'present'),
(33, 'TCH008', '2025-06-20', 'absent'),
(34, 'TCH009', '2025-06-20', 'present'),
(35, 'TCH010', '2025-06-20', 'present'),
(36, 'EMP11', '2025-06-20', 'absent'),
(37, 'TCH006', '2025-06-21', 'present'),
(38, 'TCH007', '2025-06-21', 'present'),
(39, 'TCH008', '2025-06-21', 'absent'),
(40, 'TCH009', '2025-06-21', 'present'),
(41, 'TCH010', '2025-06-21', 'present'),
(42, 'EMP11', '2025-06-21', 'absent'),
(43, 'TCH006', '2025-06-23', 'present'),
(44, 'TCH007', '2025-06-23', 'present'),
(45, 'TCH008', '2025-06-23', 'absent'),
(46, 'TCH009', '2025-06-23', 'present'),
(47, 'TCH010', '2025-06-23', 'present'),
(48, 'EMP11', '2025-06-23', 'absent'),
(49, 'TCH006', '2025-06-22', 'present'),
(50, 'TCH007', '2025-06-22', 'present'),
(51, 'TCH008', '2025-06-22', 'absent'),
(52, 'TCH009', '2025-06-22', 'present'),
(53, 'TCH010', '2025-06-22', 'present'),
(54, 'EMP11', '2025-06-22', 'absent'),
(55, 'TCH006', '2025-07-02', 'present'),
(56, 'TCH007', '2025-07-02', 'present'),
(57, 'TCH008', '2025-07-02', 'absent'),
(58, 'TCH009', '2025-07-02', 'present'),
(59, 'TCH010', '2025-07-02', 'present'),
(60, 'EMP11', '2025-07-02', 'absent'),
(61, 'TCH006', '2025-07-03', 'present'),
(62, 'TCH007', '2025-07-03', 'present'),
(63, 'TCH008', '2025-07-03', 'absent'),
(64, 'TCH009', '2025-07-03', 'present'),
(65, 'TCH010', '2025-07-03', 'present'),
(66, 'EMP11', '2025-07-03', 'absent');

-- --------------------------------------------------------

--
-- Table structure for table `employee_salary`
--

CREATE TABLE `employee_salary` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `pay_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_salary`
--

INSERT INTO `employee_salary` (`id`, `employee_id`, `name`, `email`, `salary`, `pay_date`, `created_at`) VALUES
(19, 'TCH010', 'Nusrat Jahan', 'nusrat@example.com', 13000.00, '2025-06-02 21:28:32', '2025-06-02 21:28:32'),
(20, 'EMP11', 'Tahmina Tammy', 'tahmina@gmail.com', 21200.00, '2025-06-02 21:28:32', '2025-06-02 21:28:32'),
(21, 'TCH001', 'Abdul Karim', 'karim@example.com', 21000.00, '2025-06-02 21:33:13', '2025-06-02 21:33:13');

-- --------------------------------------------------------

--
-- Table structure for table `exam_types`
--

CREATE TABLE `exam_types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exam_types`
--

INSERT INTO `exam_types` (`id`, `name`) VALUES
(1, 'First Term'),
(2, 'Second Term'),
(3, 'Annual');

-- --------------------------------------------------------

--
-- Table structure for table `fee_amount`
--

CREATE TABLE `fee_amount` (
  `id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `fee_category_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fee_amount`
--

INSERT INTO `fee_amount` (`id`, `class_id`, `fee_category_id`, `amount`) VALUES
(1, 1, 1, 3000.00),
(2, 1, 2, 500.00),
(3, 1, 3, 500.00),
(5, 2, 1, 3500.00),
(6, 2, 2, 500.00),
(7, 2, 3, 500.00),
(8, 7, 1, 7000.00),
(9, 7, 2, 1700.00),
(10, 7, 3, 700.00);

-- --------------------------------------------------------

--
-- Table structure for table `fee_categories`
--

CREATE TABLE `fee_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fee_categories`
--

INSERT INTO `fee_categories` (`id`, `name`) VALUES
(1, 'Registration Fee'),
(2, 'Monthy Fee'),
(3, 'Exam fee');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, 'Science'),
(2, 'Arts'),
(3, 'Commerce');

-- --------------------------------------------------------

--
-- Table structure for table `marks`
--

CREATE TABLE `marks` (
  `id` int(11) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `class` varchar(50) NOT NULL,
  `group` varchar(50) DEFAULT NULL,
  `shift` varchar(50) DEFAULT NULL,
  `session` varchar(50) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `exam_type` varchar(100) NOT NULL,
  `mark` decimal(5,2) NOT NULL,
  `entry_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `marks`
--

INSERT INTO `marks` (`id`, `student_id`, `class`, `group`, `shift`, `session`, `subject`, `exam_type`, `mark`, `entry_date`) VALUES
(16, 'STU001', '1', NULL, 'morning', '2024', 'Bangla', '1st Term', 89.00, '2025-05-29 13:32:49'),
(17, 'STU002', '1', NULL, 'morning', '2024', 'Bangla', '1st Term', 62.00, '2025-05-29 13:32:49'),
(18, 'STU003', '1', NULL, 'morning', '2024', 'Bangla', '1st Term', 80.00, '2025-05-29 13:32:49'),
(19, 'STU004', '1', NULL, 'morning', '2024', 'Bangla', '1st Term', 59.00, '2025-05-29 13:32:49');

-- --------------------------------------------------------

--
-- Table structure for table `salary_increments`
--

CREATE TABLE `salary_increments` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `previous_salary` decimal(10,2) DEFAULT NULL,
  `increment_amount` decimal(10,2) DEFAULT NULL,
  `new_salary` decimal(10,2) DEFAULT NULL,
  `increment_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary_increments`
--

INSERT INTO `salary_increments` (`id`, `name`, `employee_id`, `previous_salary`, `increment_amount`, `new_salary`, `increment_date`) VALUES
(1, NULL, 13, NULL, 1200.00, 0.00, '2025-05-27'),
(2, NULL, 13, NULL, 1200.00, 0.00, '2025-05-27'),
(3, NULL, 13, NULL, 1200.00, 0.00, '2025-05-27'),
(4, NULL, 13, NULL, 1200.00, 0.00, '2025-05-27'),
(5, NULL, 13, NULL, 1200.00, 0.00, '2025-05-27'),
(6, NULL, 13, NULL, 1200.00, 0.00, '2025-05-27'),
(7, NULL, 13, NULL, 1200.00, 0.00, '2025-05-27'),
(8, NULL, 13, 20000.00, 1200.00, 21200.00, '2025-05-27'),
(9, NULL, 13, 20000.00, 1200.00, 21200.00, '2025-05-27'),
(10, NULL, 13, 20000.00, 1200.00, 21200.00, '2025-05-27'),
(11, NULL, 13, 20000.00, 1200.00, 21200.00, '2025-05-27'),
(12, NULL, 4, 12000.00, 1500.00, 13500.00, '2025-05-27');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `year` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `year`) VALUES
(2, '2024'),
(3, '2023');

-- --------------------------------------------------------

--
-- Table structure for table `shifts`
--

CREATE TABLE `shifts` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shifts`
--

INSERT INTO `shifts` (`id`, `name`) VALUES
(1, 'Day'),
(2, 'Night');

-- --------------------------------------------------------

--
-- Table structure for table `students_attendance`
--

CREATE TABLE `students_attendance` (
  `id` int(11) NOT NULL,
  `student_id` varchar(50) DEFAULT NULL,
  `roll` int(50) NOT NULL,
  `class` varchar(20) DEFAULT NULL,
  `attendance_date` date DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students_attendance`
--

INSERT INTO `students_attendance` (`id`, `student_id`, `roll`, `class`, `attendance_date`, `status`) VALUES
(188, 'S001', 1, '5', '2025-05-23', 'Present'),
(189, 'S002', 2, '5', '2025-05-23', 'Absent'),
(190, 'S003', 3, '5', '2025-05-23', 'Present'),
(191, 'S004', 4, '5', '2025-05-23', 'Present'),
(192, 'S005', 5, '5', '2025-05-23', 'Present'),
(193, 'S091', 1, '10', '2025-05-23', 'Present'),
(194, 'S092', 2, '10', '2025-05-23', 'Absent'),
(195, 'S093', 3, '10', '2025-05-23', 'Present'),
(196, 'S094', 4, '10', '2025-05-23', 'Present'),
(197, 'S095', 5, '10', '2025-05-23', 'Absent'),
(198, 'S096', 6, '10', '2025-05-23', 'Present'),
(199, 'S097', 7, '10', '2025-05-23', 'Absent'),
(200, 'S098', 8, '10', '2025-05-23', 'Present'),
(201, 'S099', 9, '10', '2025-05-23', 'Present'),
(202, 'S100', 10, '10', '2025-05-23', 'Present'),
(203, '101', 1, '5', '2025-05-28', 'present'),
(204, '102', 2, '5', '2025-05-28', 'absent'),
(207, '101', 1, '1', '2025-05-28', 'present'),
(208, '102', 2, '1', '2025-05-28', 'absent'),
(209, 'STU001', 1, '1', '2025-05-28', 'present'),
(210, 'STU002', 2, '1', '2025-05-28', 'absent'),
(211, 'STU001', 1, '1', '2025-05-23', 'present'),
(212, 'STU002', 2, '1', '2025-05-23', 'absent'),
(213, 'STU001', 1, '1', '2025-05-21', 'present'),
(214, 'STU002', 2, '1', '2025-05-21', 'absent'),
(215, 'STU001', 1, '1', '2025-05-27', 'present'),
(216, 'STU002', 2, '1', '2025-05-27', 'absent'),
(217, 'STU001', 1, '1', '2025-05-31', 'absent'),
(218, 'STU002', 2, '1', '2025-05-31', 'absent'),
(219, 'STU001', 1, '1', '2025-05-01', 'absent'),
(220, 'STU002', 2, '1', '2025-05-01', 'absent'),
(221, 'STU001', 1, '1', '2025-05-02', 'absent'),
(222, 'STU002', 2, '1', '2025-05-02', 'absent');

-- --------------------------------------------------------

--
-- Table structure for table `students_registration`
--

CREATE TABLE `students_registration` (
  `id` int(11) NOT NULL,
  `student_id` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `session` varchar(50) DEFAULT NULL,
  `shift` varchar(50) DEFAULT NULL,
  `class` int(20) DEFAULT NULL,
  `group` varchar(50) DEFAULT NULL,
  `roll` int(11) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `guardian_name` varchar(100) DEFAULT NULL,
  `guardian_phone` varchar(20) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `discounts` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `students_registration`
--

INSERT INTO `students_registration` (`id`, `student_id`, `name`, `session`, `shift`, `class`, `group`, `roll`, `gender`, `birth_date`, `phone`, `email`, `address`, `guardian_name`, `guardian_phone`, `photo`, `discounts`) VALUES
(7, 'STU001', 'Natalie Perkins', '2024', 'Day', 1, NULL, 1, 'Female', '2015-10-28', '01733278876', 'natalieperkins1@gmail.com', 'Hernandezchester, Dhaka', 'Jennifer Austin', '01724971482', 'student1.jpg', 30),
(8, 'STU002', 'Valerie George', '2024', 'Morning', 1, NULL, 2, 'Female', '2012-03-01', '01757654963', 'valeriegeorge2@gmail.com', 'Lake Eddie, Dhaka', 'Sarah Owen', '01710906423', 'student2.jpg', 30),
(9, 'STU003', 'Gina Mitchell MD', '2024', 'Morning', 1, NULL, 3, 'Female', '2015-04-11', '01760368201', 'ginamitchellmd3@gmail.com', 'Guerrafurt, Dhaka', 'Michael Moody', '01793474356', 'student3.jpg', 20),
(10, 'STU004', 'Teresa Skinner', '2024', 'Day', 1, NULL, 4, 'Male', '2012-03-30', '01746193822', 'teresaskinner4@gmail.com', 'New Danashire, Dhaka', 'Jennifer Ball', '01728105921', 'student4.jpg', 10),
(11, 'STU005', 'Sarah Davidson', '2024', 'Morning', 1, NULL, 5, 'Male', '2013-02-28', '01787319768', 'sarahdavidson5@gmail.com', 'East Michael, Dhaka', 'Melvin Turner', '01714766870', 'student5.jpg', 20),
(12, 'STU006', 'Patrick Russell', '2024', 'Day', 1, NULL, 6, 'Female', '2014-10-29', '01768563457', 'patrickrussell6@gmail.com', 'Rodrigueztown, Dhaka', 'Holly Smith', '01788881966', 'student6.jpg', 10),
(13, 'STU007', 'Zachary Carson', '2024', 'Morning', 1, NULL, 7, 'Female', '2016-01-23', '01750815562', 'zacharycarson7@gmail.com', 'New Shelley, Dhaka', 'Stacey Moore', '01767104796', 'student7.jpg', 20),
(14, 'STU008', 'Mary Campbell', '2024', 'Morning', 1, NULL, 8, 'Female', '2013-05-14', '01749161267', 'marycampbell8@gmail.com', 'Amybury, Dhaka', 'Michael Reed', '01712151175', 'student8.jpg', 10),
(15, 'STU009', 'Adam Hartman', '2024', 'Morning', 1, NULL, 9, 'Female', '2015-06-29', '01743458461', 'adamhartman9@gmail.com', 'North Michaelmouth, Dhaka', 'Nicole Chambers', '01753941403', 'student9.jpg', 20),
(16, 'STU010', 'Jessica Jones', '2024', 'Day', 1, NULL, 10, 'Female', '2016-01-25', '01738546064', 'jessicajones10@gmail.com', 'Sarahport, Dhaka', 'Michael White', '01728220846', 'student10.jpg', 10),
(17, 'STU011', 'Megan Griffin', '2024', 'Morning', 1, NULL, 11, 'Female', '2013-05-06', '01772922669', 'megangriffin11@gmail.com', 'Port Danielton, Dhaka', 'Charles Gallegos', '01737662667', 'student11.jpg', 10),
(18, 'STU012', 'Monique Murphy', '2024', 'Morning', 1, NULL, 12, 'Female', '2015-10-06', '01772226400', 'moniquemurphy12@gmail.com', 'Port Kimberlyside, Dhaka', 'Luis Delgado', '01761648941', 'student12.jpg', 10),
(19, 'STU013', 'Oscar Cantu', '2024', 'Day', 2, NULL, 1, 'Male', '2012-05-02', '01768885113', 'oscarcantu13@gmail.com', 'West Kevinland, Dhaka', 'Steven May', '01715334379', 'student13.jpg', 30),
(20, 'STU014', 'Amanda Anderson', '2024', 'Morning', 2, NULL, 2, 'Male', '2012-11-01', '01774123967', 'amandaanderson14@gmail.com', 'Andrewview, Dhaka', 'Ricky Mason', '01720084896', 'student14.jpg', 30),
(21, 'STU015', 'Susan Campbell', '2024', 'Morning', 2, NULL, 3, 'Female', '2013-04-20', '01726208451', 'susancampbell15@gmail.com', 'Maciasbury, Dhaka', 'Kristin Daniel', '01742593962', 'student15.jpg', 20),
(22, 'STU016', 'Paul Duke', '2024', 'Day', 2, NULL, 4, 'Female', '2011-12-30', '01733816819', 'paulduke16@gmail.com', 'Port Alexashire, Dhaka', 'Tiffany Anderson', '01797706272', 'student16.jpg', 30),
(23, 'STU017', 'Charles Velez', '2024', 'Day', 2, NULL, 5, 'Male', '2014-08-24', '01789685191', 'charlesvelez17@gmail.com', 'Richardberg, Dhaka', 'Stanley Garcia', '01733982222', 'student17.jpg', 20),
(24, 'STU018', 'John Wright', '2024', 'Day', 2, NULL, 6, 'Male', '2014-04-10', '01730032167', 'johnwright18@gmail.com', 'Hortonberg, Dhaka', 'Laura Reyes', '01765421190', 'student18.jpg', 20),
(25, 'STU019', 'Tracy Reynolds', '2024', 'Day', 2, NULL, 7, 'Male', '2014-01-06', '01756415866', 'tracyreynolds19@gmail.com', 'South Samanthafurt, Dhaka', 'Dawn Suarez', '01791454395', 'student19.jpg', 10),
(26, 'STU020', 'Karina Simmons', '2024', 'Morning', 2, NULL, 8, 'Female', '2013-01-31', '01742301269', 'karinasimmons20@gmail.com', 'Lake Marymouth, Dhaka', 'Daniel Gordon', '01782550026', 'student20.jpg', 30),
(27, 'STU021', 'Michael Miller', '2024', 'Morning', 2, NULL, 9, 'Female', '2012-07-04', '01733662791', 'michaelmiller21@gmail.com', 'Bryantburgh, Dhaka', 'Courtney Carrillo', '01726073048', 'student21.jpg', 10),
(28, 'STU022', 'Matthew Summers', '2024', 'Morning', 2, NULL, 10, 'Female', '2016-03-17', '01784802970', 'matthewsummers22@gmail.com', 'New Jerrymouth, Dhaka', 'Lisa Heath', '01783708282', 'student22.jpg', 20),
(29, 'STU023', 'Derrick Brooks', '2024', 'Morning', 2, NULL, 11, 'Male', '2012-01-14', '01747967457', 'derrickbrooks23@gmail.com', 'South Tiffanymouth, Dhaka', 'Jermaine Stanley', '01735816633', 'student23.jpg', 20),
(30, 'STU024', 'Jordan Jones', '2024', 'Day', 2, NULL, 12, 'Female', '2012-10-06', '01733931928', 'jordanjones24@gmail.com', 'West Makayla, Dhaka', 'Danielle French', '01785784178', 'student24.jpg', 10),
(31, 'STU025', 'Kevin Johnson', '2024', 'Morning', 3, NULL, 1, 'Female', '2011-10-06', '01752176651', 'kevinjohnson25@gmail.com', 'New William, Dhaka', 'Kevin Gibson', '01710147858', 'student25.jpg', 20),
(32, 'STU026', 'Thomas Garrison', '2024', 'Day', 3, NULL, 2, 'Male', '2013-02-03', '01757551716', 'thomasgarrison26@gmail.com', 'Avilaburgh, Dhaka', 'Angela Hutchinson', '01794337873', 'student26.jpg', 30),
(33, 'STU027', 'Suzanne Salazar', '2024', 'Day', 3, NULL, 3, 'Male', '2012-09-15', '01763029072', 'suzannesalazar27@gmail.com', 'New Miranda, Dhaka', 'John Goodwin', '01755959695', 'student27.jpg', 30),
(34, 'STU028', 'Jessica Brown', '2024', 'Day', 3, NULL, 4, 'Male', '2015-04-05', '01783474300', 'jessicabrown28@gmail.com', 'New Xavier, Dhaka', 'Emily Jordan', '01752663347', 'student28.jpg', 30),
(35, 'STU029', 'Brenda Marshall', '2024', 'Day', 3, NULL, 5, 'Male', '2011-12-22', '01736442135', 'brendamarshall29@gmail.com', 'South Madeline, Dhaka', 'Richard Bailey', '01715484001', 'student29.jpg', 30),
(36, 'STU030', 'Misty Fuller', '2024', 'Day', 3, NULL, 6, 'Male', '2014-08-24', '01751516662', 'mistyfuller30@gmail.com', 'New Justinfurt, Dhaka', 'Donna Medina', '01786878475', 'student30.jpg', 20),
(37, 'STU031', 'Margaret Thomas', '2024', 'Day', 3, NULL, 7, 'Female', '2012-11-15', '01770411958', 'margaretthomas31@gmail.com', 'Robinsonville, Dhaka', 'Rhonda Williams', '01763411902', 'student31.jpg', 10),
(38, 'STU032', 'Sara Jackson', '2024', 'Morning', 3, NULL, 8, 'Male', '2011-07-18', '01771758048', 'sarajackson32@gmail.com', 'West George, Dhaka', 'Jared Mcknight', '01755388723', 'student32.jpg', 30),
(39, 'STU033', 'Madison Horn', '2024', 'Day', 3, NULL, 9, 'Female', '2014-06-18', '01790024452', 'madisonhorn33@gmail.com', 'South Gregory, Dhaka', 'Danielle Green', '01778889237', 'student33.jpg', 10),
(40, 'STU034', 'Elizabeth Mccormick', '2024', 'Day', 3, NULL, 10, 'Male', '2011-12-05', '01721885206', 'elizabethmccormick34@gmail.com', 'North Dawnton, Dhaka', 'Gina Bell', '01751247340', 'student34.jpg', 30),
(41, 'STU035', 'Michaela Tanner', '2024', 'Morning', 3, NULL, 11, 'Female', '2013-12-20', '01777601739', 'michaelatanner35@gmail.com', 'East Davidmouth, Dhaka', 'Virginia Gonzalez', '01761101703', 'student35.jpg', 20),
(42, 'STU036', 'Sherry Maxwell', '2024', 'Morning', 3, NULL, 12, 'Male', '2011-08-26', '01730302991', 'sherrymaxwell36@gmail.com', 'East Monica, Dhaka', 'Manuel Guerra', '01725748493', 'student36.jpg', 20),
(43, 'STU037', 'Michael Dalton', '2024', 'Morning', 4, NULL, 1, 'Male', '2014-05-02', '01788536344', 'michaeldalton37@gmail.com', 'North Justinmouth, Dhaka', 'Daniel King', '01718269264', 'student37.jpg', 10),
(44, 'STU044', 'Mimha oss', '2024', 'Morning', 4, NULL, 2, 'Female', '2013-05-12', '01711111111', 'tanvir5@gmail.com', 'Mirpur, Dhaka', 'Nur Alam', '01722222222', 'Mimha_c_4_r_2.jpg', 30),
(45, 'STU039', 'Amanda Torres', '2024', 'Morning', 4, NULL, 3, 'Female', '2014-09-05', '01712130698', 'amandatorres39@gmail.com', 'Taylorville, Dhaka', 'Margaret Bell', '01764975143', 'student39.jpg', 30),
(46, 'STU040', 'John Davis', '2024', 'Morning', 4, NULL, 4, 'Male', '2015-02-26', '01748428980', 'johndavis40@gmail.com', 'South Thomasburgh, Dhaka', 'Amanda Sanders', '01744910709', 'student40.jpg', 30),
(47, 'STU041', 'Sharon Jackson', '2024', 'Day', 4, NULL, 5, 'Male', '2016-01-18', '01775764366', 'sharonjackson41@gmail.com', 'South Julie, Dhaka', 'Derek Orr', '01743740360', 'student41.jpg', 10),
(48, 'STU042', 'Gary Johnson', '2024', 'Day', 4, NULL, 6, 'Male', '2015-02-17', '01751032469', 'garyjohnson42@gmail.com', 'New Clifford, Dhaka', 'Donna Stanley', '01724198959', 'student42.jpg', 30),
(49, 'STU043', 'Calvin Harris Jr.', '2024', 'Day', 4, NULL, 7, 'Female', '2012-06-11', '01713460197', 'calvinharrisjr.43@gmail.com', 'Alvarezberg, Dhaka', 'Ryan Williams', '01798195110', 'student43.jpg', 20),
(50, 'STU044', 'Joshua Ramsey', '2024', 'Day', 4, NULL, 8, 'Female', '2012-05-29', '01720730110', 'joshuaramsey44@gmail.com', 'East Martin, Dhaka', 'Julie Mcdaniel', '01755587367', 'student44.jpg', 10),
(51, 'STU045', 'Wendy Norton', '2024', 'Morning', 4, NULL, 9, 'Female', '2011-11-10', '01776810849', 'wendynorton45@gmail.com', 'South Stephanie, Dhaka', 'Samantha Peterson', '01793570713', 'student45.jpg', 20),
(52, 'STU046', 'Anthony Sampson', '2024', 'Morning', 4, NULL, 10, 'Male', '2012-01-18', '01764717037', 'anthonysampson46@gmail.com', 'Elizabethmouth, Dhaka', 'Stacey Roberts', '01725236853', 'student46.jpg', 10),
(53, 'STU047', 'Victoria Brown', '2024', 'Morning', 4, NULL, 11, 'Male', '2012-01-05', '01710859879', 'victoriabrown47@gmail.com', 'Curryview, Dhaka', 'Michael Taylor', '01765119313', 'student47.jpg', 10),
(54, 'STU048', 'Nicole Gates', '2024', 'Morning', 4, NULL, 12, 'Female', '2011-07-19', '01784525321', 'nicolegates48@gmail.com', 'South Jonathantown, Dhaka', 'Travis Allen', '01777027823', 'student48.jpg', 30),
(55, 'STU049', 'Elizabeth Holland', '2024', 'Morning', 5, NULL, 1, 'Male', '2015-02-05', '01778440033', 'elizabethholland49@gmail.com', 'Chelseafurt, Dhaka', 'John Johnson', '01741155228', 'student49.jpg', 20),
(56, 'STU050', 'Jason Harvey', '2024', 'Morning', 5, NULL, 2, 'Female', '2012-04-29', '01789837856', 'jasonharvey50@gmail.com', 'North Albert, Dhaka', 'Brittany Smith', '01748166760', 'student50.jpg', 30),
(57, 'STU051', 'Janet Evans', '2024', 'Morning', 5, NULL, 3, 'Male', '2012-10-04', '01792694349', 'janetevans51@gmail.com', 'Port Mariamouth, Dhaka', 'Andrew Harris', '01791954761', 'student51.jpg', 20),
(58, 'STU052', 'Chad Murray', '2024', 'Day', 5, NULL, 4, 'Female', '2016-05-16', '01776204498', 'chadmurray52@gmail.com', 'East Charles, Dhaka', 'Danielle Tucker', '01799915972', 'student52.jpg', 20),
(59, 'STU053', 'Krystal Parker', '2024', 'Day', 5, NULL, 5, 'Male', '2016-01-18', '01733076499', 'krystalparker53@gmail.com', 'Gutierrezland, Dhaka', 'Mary Meza', '01781340861', 'student53.jpg', 30),
(60, 'STU054', 'Laura Cannon', '2024', 'Day', 5, NULL, 6, 'Female', '2014-01-21', '01736540284', 'lauracannon54@gmail.com', 'East Brendashire, Dhaka', 'Troy Norton', '01718276886', 'student54.jpg', 10),
(61, 'STU055', 'Christina Rowe', '2024', 'Day', 5, NULL, 7, 'Male', '2012-12-13', '01730685482', 'christinarowe55@gmail.com', 'Stephenbury, Dhaka', 'Mr. Walter Mckenzie', '01732541075', 'student55.jpg', 10),
(62, 'STU056', 'John Garcia', '2024', 'Morning', 5, NULL, 8, 'Female', '2014-11-08', '01759111429', 'johngarcia56@gmail.com', 'Harveymouth, Dhaka', 'Megan Perez', '01742081586', 'student56.jpg', 30),
(63, 'STU057', 'Diana Davenport', '2024', 'Morning', 5, NULL, 9, 'Female', '2012-09-12', '01751801218', 'dianadavenport57@gmail.com', 'East Sandra, Dhaka', 'Sarah Byrd', '01783341913', 'student57.jpg', 10),
(64, 'STU058', 'Antonio Hall', '2024', 'Day', 5, NULL, 10, 'Male', '2015-10-08', '01731531621', 'antoniohall58@gmail.com', 'Howardfurt, Dhaka', 'Dana Quinn', '01786454215', 'student58.jpg', 10),
(65, 'STU059', 'Adam Kim', '2024', 'Day', 5, NULL, 11, 'Female', '2015-02-09', '01741411010', 'adamkim59@gmail.com', 'North Laurafort, Dhaka', 'Tony Rasmussen', '01761535970', 'student59.jpg', 20),
(66, 'STU060', 'James Munoz', '2024', 'Morning', 5, NULL, 12, 'Female', '2012-11-21', '01740174078', 'jamesmunoz60@gmail.com', 'Hudsonland, Dhaka', 'Marissa Rogers', '01763719274', 'student60.jpg', 30),
(67, 'STU061', 'Michael Reeves', '2024', 'Day', 6, NULL, 1, 'Male', '2013-05-08', '01787708670', 'michaelreeves61@gmail.com', 'Lake Rebekahshire, Dhaka', 'Michael Hampton', '01724052301', 'student61.jpg', 30),
(68, 'STU062', 'Samantha Lindsey', '2024', 'Morning', 6, NULL, 2, 'Female', '2014-07-07', '01798203252', 'samanthalindsey62@gmail.com', 'South Mirandaburgh, Dhaka', 'David Maxwell', '01787520699', 'student62.jpg', 30),
(69, 'STU063', 'Lisa Moore', '2024', 'Day', 6, NULL, 3, 'Female', '2015-04-21', '01712105545', 'lisamoore63@gmail.com', 'South Susan, Dhaka', 'Emily Lloyd', '01757254857', 'student63.jpg', 30),
(70, 'STU064', 'Mary Long', '2024', 'Morning', 6, NULL, 4, 'Female', '2015-11-07', '01751415068', 'marylong64@gmail.com', 'Mortonton, Dhaka', 'Jeffrey Castro', '01746386339', 'student64.jpg', 20),
(71, 'STU065', 'Megan Aguirre', '2024', 'Morning', 6, NULL, 5, 'Female', '2011-08-03', '01712993341', 'meganaguirre65@gmail.com', 'South Kathleen, Dhaka', 'Isaiah Grant', '01718127618', 'student65.jpg', 10),
(72, 'STU066', 'Dave Carter', '2024', 'Morning', 6, NULL, 6, 'Female', '2012-12-12', '01739131655', 'davecarter66@gmail.com', 'Brendafort, Dhaka', 'Carla Davis', '01767707098', 'student66.jpg', 20),
(73, 'STU067', 'Colleen Taylor', '2024', 'Morning', 6, NULL, 7, 'Male', '2014-07-15', '01719091381', 'colleentaylor67@gmail.com', 'South Michaelside, Dhaka', 'Rachel Thompson', '01716442422', 'student67.jpg', 10),
(74, 'STU068', 'Kari Simpson', '2024', 'Day', 6, NULL, 8, 'Male', '2013-06-28', '01713551271', 'karisimpson68@gmail.com', 'Port Patrickborough, Dhaka', 'Roberto Lewis', '01748871594', 'student68.jpg', 10),
(75, 'STU069', 'Lori Smith', '2024', 'Day', 6, NULL, 9, 'Female', '2014-01-14', '01771275209', 'lorismith69@gmail.com', 'Kennedymouth, Dhaka', 'Lisa Bell', '01770856110', 'student69.jpg', 30),
(76, 'STU070', 'Miss Katherine Warner', '2024', 'Morning', 6, NULL, 10, 'Female', '2012-09-04', '01744786271', 'misskatherinewarner70@gmail.com', 'Lake Kathleenhaven, Dhaka', 'Derrick Curtis', '01775803938', 'student70.jpg', 10),
(77, 'STU071', 'Jacob Wiggins', '2024', 'Day', 6, NULL, 11, 'Male', '2015-04-08', '01720927653', 'jacobwiggins71@gmail.com', 'Spencerberg, Dhaka', 'Laura Pratt', '01771016817', 'student71.jpg', 20),
(78, 'STU072', 'Keith King', '2024', 'Day', 6, NULL, 12, 'Female', '2012-10-10', '01751221567', 'keithking72@gmail.com', 'Jordanside, Dhaka', 'Jacob Wood', '01771246574', 'student72.jpg', 10),
(79, 'STU073', 'Jesse Herrera', '2024', 'Day', 7, NULL, 5, 'Female', '2015-08-22', '01770011996', 'jesseherrera73@gmail.com', 'East Michaelburgh, Dhaka', 'Kristy Marshall', '01796670582', 'student73.jpg', 10),
(80, 'STU074', 'Mrs. Angela Cunningham MD', '2024', 'Day', 7, NULL, 2, 'Female', '2013-07-23', '01769991297', 'mrs.angelacunninghammd74@gmail.com', 'North Davidbury, Dhaka', 'Barbara Evans', '01752291397', 'student74.jpg', 30),
(81, 'STU075', 'Lori Brown', '2024', 'Morning', 7, NULL, 3, 'Male', '2013-04-27', '01721812019', 'loribrown75@gmail.com', 'South Stephenfurt, Dhaka', 'Casey Thompson', '01711190137', 'student75.jpg', 30),
(82, 'STU076', 'Jason Roberts', '2024', 'Day', 7, NULL, 4, 'Male', '2015-06-17', '01765628585', 'jasonroberts76@gmail.com', 'Nicholashaven, Dhaka', 'Lisa Green', '01739950204', 'student76.jpg', 10),
(83, 'STU077', 'Amanda Tucker', '2024', 'Morning', 7, NULL, 1, 'Male', '2013-02-28', '01721724563', 'amandatucker77@gmail.com', 'Bethside, Dhaka', 'William Gray', '01765266627', 'student77.jpg', 10),
(84, 'STU078', 'Gregory Webb', '2024', 'Morning', 7, NULL, 3, 'Female', '2015-11-22', '01744656938', 'gregorywebb78@gmail.com', 'Barnesborough, Dhaka', 'Ashley Powell', '01747389996', 'student78.jpg', 10),
(85, 'STU079', 'Natalie Lee', '2024', 'Day', 7, NULL, 7, 'Female', '2014-08-24', '01760804938', 'natalielee79@gmail.com', 'New Lindsey, Dhaka', 'Rachel Hardin', '01763223110', 'student79.jpg', 10),
(86, 'STU080', 'Lance Castillo', '2024', 'Day', 7, NULL, 8, 'Male', '2013-01-22', '01784166633', 'lancecastillo80@gmail.com', 'Port Kim, Dhaka', 'Alexander Dudley', '01728011509', 'student80.jpg', 30),
(87, 'STU081', 'Timothy Mccoy', '2024', 'Day', 7, NULL, 9, 'Male', '2012-07-26', '01769328251', 'timothymccoy81@gmail.com', 'Brandyberg, Dhaka', 'Paul Giles', '01782208520', 'student81.jpg', 20),
(88, 'STU082', 'Susan Flores', '2024', 'Morning', 7, NULL, 10, 'Male', '2016-05-21', '01757675091', 'susanflores82@gmail.com', 'Taylorport, Dhaka', 'John Delgado', '01768595996', 'student82.jpg', 10),
(89, 'STU083', 'Susan Jackson', '2024', 'Day', 7, NULL, 11, 'Female', '2014-06-27', '01727004708', 'susanjackson83@gmail.com', 'Scottland, Dhaka', 'Veronica Martinez', '01714245793', 'student83.jpg', 10),
(90, 'STU084', 'Bryan Collins', '2024', 'Day', 7, NULL, 2, 'Male', '2011-09-28', '01773418443', 'bryancollins84@gmail.com', 'Vincentport, Dhaka', 'Diane Cole', '01785558039', 'student84.jpg', 30),
(91, 'STU085', 'Victor Conner', '2024', 'Morning', 8, NULL, 1, 'Male', '2016-05-20', '01730125704', 'victorconner85@gmail.com', 'Charleston, Dhaka', 'Michele Fox', '01756570374', 'student85.jpg', 20),
(92, 'STU086', 'Matthew Sosa', '2024', 'Day', 8, NULL, 2, 'Male', '2013-01-13', '01721248817', 'matthewsosa86@gmail.com', 'Emmashire, Dhaka', 'Jose Kelley', '01772137552', 'student86.jpg', 30),
(93, 'STU087', 'Kerry Kim', '2024', 'Morning', 8, NULL, 3, 'Male', '2016-03-16', '01741628192', 'kerrykim87@gmail.com', 'Derrickside, Dhaka', 'Christopher Miranda', '01798865820', 'student87.jpg', 10),
(94, 'STU088', 'Alexa Li', '2024', 'Day', 8, NULL, 1, 'Male', '2012-06-21', '01799913463', 'alexali88@gmail.com', 'Port Melissa, Dhaka', 'Rebecca Ross', '01767902020', 'student88.jpg', 30),
(95, 'STU089', 'Julie Sanchez', '2024', 'Morning', 8, NULL, 3, 'Male', '2011-07-03', '01753998287', 'juliesanchez89@gmail.com', 'Kennedyville, Dhaka', 'Madison Tapia', '01766883171', 'student89.jpg', 20),
(96, 'STU090', 'Leah Pratt', '2024', 'Day', 8, NULL, 6, 'Male', '2016-01-27', '01771820323', 'leahpratt90@gmail.com', 'Port Karla, Dhaka', 'Jerry Clark Jr.', '01727936519', 'student90.jpg', 30),
(97, 'STU091', 'Kyle Torres', '2024', 'Day', 8, NULL, 7, 'Male', '2012-01-14', '01782140766', 'kyletorres91@gmail.com', 'Montoyamouth, Dhaka', 'Steven Reynolds', '01793655544', 'student91.jpg', 10),
(98, 'STU092', 'Christopher Ward', '2024', 'Day', 8, NULL, 2, 'Female', '2015-07-02', '01751143134', 'christopherward92@gmail.com', 'Lake Marcbury, Dhaka', 'Gina Cox', '01720625174', 'student92.jpg', 20),
(99, 'STU093', 'Julie Walter MD', '2024', 'morning', 9, 'science', 9, 'Male', '2012-07-04', '01717068322', 'juliewaltermd93@gmail.com', 'Warnerton, Dhaka', 'Nicole Wallace', '01731447097', 'student93.jpg', 10),
(100, 'STU094', 'Shannon Lewis', '2024', 'morning', 9, 'science', 10, 'Female', '2014-10-22', '01725347590', 'shannonlewis94@gmail.com', 'Deborahstad, Dhaka', 'Monica Woodward', '01778162403', 'student94.jpg', 10);

-- --------------------------------------------------------

--
-- Table structure for table `student_fee_payments`
--

CREATE TABLE `student_fee_payments` (
  `id` int(11) NOT NULL,
  `student_id` varchar(50) DEFAULT NULL,
  `session` varchar(10) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `fee_category` varchar(100) DEFAULT NULL,
  `fee_amount` decimal(10,2) DEFAULT NULL,
  `discount` decimal(5,2) DEFAULT NULL,
  `payable` decimal(10,2) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_fee_payments`
--

INSERT INTO `student_fee_payments` (`id`, `student_id`, `session`, `class_id`, `fee_category`, `fee_amount`, `discount`, `payable`, `payment_date`) VALUES
(1, 'S2025001', '2025', 7, 'Monthly Tuition Fee', 500.00, 10.00, 450.00, '2025-06-01 13:23:49'),
(2, 'S2025002', '2025', 7, 'Monthly Tuition Fee', 500.00, 0.00, 500.00, '2025-06-01 13:23:49'),
(4, 'S001', '2025', 1, 'Monthly Tuition Fee', 500.00, 10.00, 450.00, '2025-06-02 20:29:37'),
(5, 'S002', '2025', 1, 'Monthly Tuition Fee', 500.00, 0.00, 500.00, '2025-06-02 20:29:37');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`) VALUES
(1, 'Bangla'),
(2, 'English'),
(3, 'Math'),
(4, 'Islamic Studies');

-- --------------------------------------------------------

--
-- Table structure for table `subject_assignments`
--

CREATE TABLE `subject_assignments` (
  `id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `full_mark` int(11) DEFAULT NULL,
  `pass_mark` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject_assignments`
--

INSERT INTO `subject_assignments` (`id`, `class_id`, `subject_id`, `full_mark`, `pass_mark`) VALUES
(1, 1, 1, 100, 40),
(3, 1, 2, 100, 30),
(4, 1, 3, 100, 40),
(5, 2, 3, 100, 40),
(6, 1, 4, 100, 40);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees_attendance`
--
ALTER TABLE `employees_attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_salary`
--
ALTER TABLE `employee_salary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exam_types`
--
ALTER TABLE `exam_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fee_amount`
--
ALTER TABLE `fee_amount`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `fee_category_id` (`fee_category_id`);

--
-- Indexes for table `fee_categories`
--
ALTER TABLE `fee_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `marks`
--
ALTER TABLE `marks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salary_increments`
--
ALTER TABLE `salary_increments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students_attendance`
--
ALTER TABLE `students_attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students_registration`
--
ALTER TABLE `students_registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_fee_payments`
--
ALTER TABLE `student_fee_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject_assignments`
--
ALTER TABLE `subject_assignments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `employees_attendance`
--
ALTER TABLE `employees_attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `employee_salary`
--
ALTER TABLE `employee_salary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `exam_types`
--
ALTER TABLE `exam_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `fee_amount`
--
ALTER TABLE `fee_amount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `fee_categories`
--
ALTER TABLE `fee_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `marks`
--
ALTER TABLE `marks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `salary_increments`
--
ALTER TABLE `salary_increments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shifts`
--
ALTER TABLE `shifts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `students_attendance`
--
ALTER TABLE `students_attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=223;

--
-- AUTO_INCREMENT for table `students_registration`
--
ALTER TABLE `students_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `student_fee_payments`
--
ALTER TABLE `student_fee_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `subject_assignments`
--
ALTER TABLE `subject_assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fee_amount`
--
ALTER TABLE `fee_amount`
  ADD CONSTRAINT `fee_amount_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fee_amount_ibfk_2` FOREIGN KEY (`fee_category_id`) REFERENCES `fee_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `salary_increments`
--
ALTER TABLE `salary_increments`
  ADD CONSTRAINT `salary_increments_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
